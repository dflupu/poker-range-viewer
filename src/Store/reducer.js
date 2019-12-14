import {createReducer} from '@reduxjs/toolkit'
import path from 'path'
import * as actions from './actions'
import * as fsutil from 'Lib/fsutil'
import * as deck from 'Lib/deck'

const dataFolderPath = 'data'

const getActualPath = p => {
  return path.join(dataFolderPath, p)
}

const initialState = {
  fileBrowsers: {},
  savedRanges: {},
  modifiedRanges: {},
  errorMessage: null,
  modalId: null,
  modalArgs: []
}

const reducer = createReducer(initialState, {
  [actions.onModalShow]: onModalShow,
  [actions.onModalHide]: onModalHide,

  [actions.onRangeSave]: onRangeSave,
  [actions.onRangeCopyFrom]: onRangeCopyFrom,
  [actions.onRangeLoad]: onRangeLoad,
  [actions.onRangeChange]: onRangeChange,

  [actions.onAddFolder]: onAddFolder,
  [actions.onAddFile]: onAddFile,
  [actions.onDeleteFile]: onDeleteFile,

  [actions.setErrorMessage]: (state, action) => {
    return {...state, errorMessage: action.errorMessage}
  },
  [actions.resetErrorMessage]: (state, action) => {
    return {...state, errorMessage: null}
  },

  [actions.onFileBrowserInit]: onFileBrowserInit,
  [actions.onFileBrowserClick]: onFileBrowserClick,
})

function onModalShow(state, action) {
  const {id, args} = action.payload
  state.modalId = id
  state.modalArgs = args || {}
}

function onModalHide(state, action) {
  state.modalId = null
}

function onFileBrowserInit(state, action) {
  const {browserId, root} = action.payload

  state.fileBrowsers[browserId] = {
    root: root,
    path: '',
    pathIsDir: true,
    expanded: [],
    directoryTree: readDirectoryTree(),
  }
}

function onFileBrowserClick(state, action) {
  const {browserId, node, wasToggled, peersToUnexpand} = action.payload
  const browserData = state.fileBrowsers[browserId]

  if (node.type === 'directory') {
    if (peersToUnexpand.length === 0 && (wasToggled || !browserData.expanded.includes(node.path))) {
      if (browserData.expanded.includes(node.path)) {
        browserData.expanded = browserData.expanded.filter(x => x !== node.path)
      } else {
        browserData.expanded.push(node.path)
      }
    } else if (peersToUnexpand) {
      browserData.expanded = browserData.expanded.filter(x => !peersToUnexpand.map(p => p.path).includes(x))
      browserData.expanded.push(node.path)
    }

    const rfiNode = node.children.filter(c => c.name === 'RFI')[0]

    if (rfiNode) {
      browserData.path = rfiNode.path
      browserData.pathIsDir = rfiNode.type !== 'file'
      return
    }
  }

  browserData.path = node.path
  browserData.pathIsDir = node.type !== 'file'
}

function readDirectoryTree() {
  const sortOrder = {
    'UTG': 0,
    'UTG+1': 1,
    'UTG+2': 2,
    'LJ': 3,
    'MP': 3,
    'HJ': 4,
    'CO': 5,
    'BN': 6,
    'SB': 7,
    'SB Limp': 8,
    'BB': 8,
    'RFI': 9,
    '3-bet': 10,
    'Vs 3-bet': 11,
  }

  const sortFn = (a, b) => {
    let aKey, bKey

    for (const key of Object.keys(sortOrder)) {
      if (a.name.includes(key)) {
        aKey = key
      }

      if (b.name.includes(key)) {
        bKey = key
      }
    }

    return sortOrder[aKey] < sortOrder[bKey] ? -1 : 1
  }

  return fsutil.directoryTree(dataFolderPath, dataFolderPath, sortFn)
}

function onRangeSave(state, action) {
  const {path, range, villainRangePath} = action.payload

  writeJsonFile(path, {range, villainRangePath})

  state.modifiedRanges[path] = false
  state.savedRanges[path] = {range, villainRangePath}
}

function onDeleteFile(state, action) {
  const {browserId} = action.payload
  const browserData = state.fileBrowsers[browserId]

  if (browserData.pathIsDir) {
    return state
  }

  fsutil.unlinkFile(getActualPath(browserData.path))

  browserData.path = path.join(browserData.path, '..')
  browserData.pathIsDir = true
  browserData.directoryTree = readDirectoryTree()
}

function onRangeCopyFrom(state, action) {
  const {currentRangePath, otherRangePath} = action.payload

  onRangeLoad(state, {payload: {path: otherRangePath}})
  const otherRange = state.savedRanges[otherRangePath]

  onRangeSave(
    state, {payload: {
      path: currentRangePath,
      range: otherRange.range,
      villainRangePath: ''
    }}
  )
}

function onAddFolder(state, action) {
  const {browserId, name} = action.payload
  const browserData = state.fileBrowsers[browserId]

  const directory = browserData.pathIsDir ? browserData.path : path.dirname(browserData.path)
  const savePath = path.join(directory, name)
  fsutil.mkdir(getActualPath(savePath))

  browserData.expanded.push(savePath)
  browserData.path = savePath
  browserData.pathIsDir = true
  browserData.directoryTree = readDirectoryTree()
}

function onAddFile(state, action) {
  const {browserId, name} = action.payload
  const browserData = state.fileBrowsers[browserId]

  const dir = browserData.pathIsDir ? browserData.path : path.dirname(browserData.path)
  const savePath = path.join(dir, name)

  writeJsonFile(savePath, {range: deck.asDict, villainRangePath: ''})

  state.modifiedRanges[name] = false
  state.savedRanges[name] = {range: deck.asDict, villainRange: ''}

  browserData.expanded.push(browserData.path)
  browserData.path = savePath
  browserData.pathIsDir = false
  browserData.directoryTree = readDirectoryTree()

}

function onRangeChange(state, action) {
  const {path, value} = action.payload
  state.modifiedRanges[path] = value
}

function onRangeLoad(state, action) {
  const {path} = action.payload

  if (state.savedRanges[path]) {
    return
  }

  let range
  let villainRange
  let errorMessage = null

  try {
    range = readJsonFile(path)

    if (range.villainRangePath.length > 0) {
      villainRange = readJsonFile(range.villainRangePath)
    }
  } catch (err) {
    errorMessage = err
  }

  if (!range) {
    return
  }

  state.savedRanges[path] = {range: range.range, villainRangePath: range.villainRangePath}
  state.modifiedRanges[path] = false

  if (villainRange) {
    state.savedRanges[range.villainRangePath] = {
      range: villainRange.range,
      villainRangePath: villainRange.villainRangePath
    }
  }

  state.errorMessage = errorMessage
}

function readJsonFile(path) {
  return JSON.parse(fsutil.readFile(getActualPath(path)))
}

function writeJsonFile(path, content) {
  return fsutil.writeFile(getActualPath(path), JSON.stringify(content))
}

export default reducer
