import path from 'path'
import * as actions from './actions'
import * as fsutil from 'Lib/fsutil'
import * as deck from 'Lib/deck'

const dataFolderPath = 'data'

const getActualPath = p => {
  return path.join(dataFolderPath, p)
}

const initialState = {
  fileBrowserPath: '',
  fileBrowserPathIsDir: true,
  fileBrowserExpanded: [],
  rangeWasModified: {},
  errorMessage: null,
  savedRanges: {},
  directoryTree: readDirectoryTree(),
}

const reducer = (state=initialState, action) => {

  switch (action.type) {
    case actions.SET_FILE_BROWSER_SELECTION:
      return {
        ...state,
        fileBrowserPath: action.path,
        fileBrowserPathIsDir: action.isDir
      }
    case actions.ON_RANGE_ADDED:
      return addRange(state, action)
    case actions.ON_RANGE_SAVE:
      return saveRange(state, action)
    case actions.ON_RANGE_COPY_FROM:
      state = loadRange(state, {name: action.otherRangePath})
      const otherRange = state.savedRanges[action.otherRangePath]
      return saveRange(state, {name: action.currentRangePath, range: otherRange.range, villainRangePath: ''})
    case actions.ON_RANGE_LOAD:
      return loadRange(state, action)
    case actions.ON_ADD_FOLDER:
      const directory = state.fileBrowserPathIsDir ? state.fileBrowserPath : path.dirname(state.fileBrowserPath)
      fsutil.mkdir(path.join(directory, action.name))
      return state
    case actions.ON_ADD_FILE:
      const dir = state.fileBrowserPathIsDir ? state.fileBrowserPath : path.dirname(state.fileBrowserPath)
      const savePath = path.join(dir, action.name)
      fsutil.writeFile(getActualPath(savePath), JSON.stringify({range: deck.asDict, villainRangePath: ''}))
      return addRange(state, {name: savePath, range: deck.asDict, villainRangePath: ''})
    case actions.ON_DELETE_FILE:
      return deleteFile(state)
    case actions.TOGGLE_FILE_BROWSER_EXPANDED:
      if (state.fileBrowserExpanded.includes(action.node)) {
        return {...state, fileBrowserExpanded: state.fileBrowserExpanded.filter(x => x !== action.node)}
      } else {
        return {...state, fileBrowserExpanded: [...state.fileBrowserExpanded, action.node]}
      }
    case actions.SET_FILE_BROWSER_EXCLUSIVE_EXPANDED:
      const expanded = state.fileBrowserExpanded.filter(x => !action.peerNodes.includes(x))
      return {...state, fileBrowserExpanded: [...expanded, action.node]}
    case actions.SET_ERROR_MESSAGE:
      return {...state, errorMessage: action.errorMessage}
    case actions.RESET_ERROR_MESSAGE:
      return {...state, errorMessage: null}
    case actions.SET_RANGE_MODIFIED:
      return {
        ...state,
        rangeWasModified: {
          ...state.rangeWasModified,
          [action.name]: action.value
        }
      }
    case actions.ON_DISK_FILES_MODIFIED:
      return {
        ...state,
        diskFilesModified: action.value
      }
    default:
      break
  }

  return state
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

function addRange(state, action) {
  return {
    ...state,
    rangeWasModified: {
      ...state.rangeWasModified,
      [action.name]: false
    },
    fileBrowserPath: action.name,
    fileBrowserPathIsDir: false,
    fileBrowserExpanded: [...state.fileBrowserExpanded, state.fileBrowserPath],
    savedRanges: {
      ...state.savedRanges,
      [action.name]: {range: action.range, villainRangePath: action.villainRangePath}
    },
    directoryTree: readDirectoryTree()
  }
}

function saveRange(state, action) {

  fsutil.writeFile(
    getActualPath(action.name),
    JSON.stringify({range: action.range, villainRangePath: action.villainRangePath})
  )

  return {
    ...state,
    rangeWasModified: {
      ...state.rangeWasModified,
      [action.name]: false
    },
    savedRanges: {
      ...state.savedRanges,
      [action.name]: {range: action.range, villainRangePath: action.villainRangePath}
    },
    directoryTree: readDirectoryTree()
  }
}

function deleteFile(state) {
  if (state.fileBrowserPathIsDir) {
    return state
  }

  fsutil.unlinkFile(getActualPath(state.fileBrowserPath))
  const parentDir = path.join(state.fileBrowserPath, '..')

  return {
    ...state,
    fileBrowserPath: parentDir,
    fileBrowserPathIsDir: fsutil.isDirectory(getActualPath(parentDir)),
    directoryTree: readDirectoryTree()
  }
}

function loadRange(state, action) {
  if (state.savedRanges[action.name]) {
    return state
  }

  let range
  let villainRange
  let errorMessage = null

  try {
    range = JSON.parse(fsutil.readFile(getActualPath(action.name)))

    if (range.villainRangePath.length > 0) {
      villainRange = JSON.parse(fsutil.readFile(getActualPath(range.villainRangePath)))
    }
  } catch (err) {
    errorMessage = err
  }

  if (!range) {
    return state
  }

  let updatedRanges = {
    ...state.savedRanges,
    [action.name]: {range: range.range, villainRangePath: range.villainRangePath}
  }

  if (villainRange) {
    updatedRanges = {
      ...updatedRanges,
      [range.villainRangePath]: {range: villainRange.range, villainRangePath: villainRange.villainRangePath}
    }
  }

  return {
    ...state,
    rangeWasModified: {
      ...state.rangeWasModified,
      [action.name]: false
    },
    savedRanges: updatedRanges,
    fileBrowserExpanded: [...state.fileBrowserExpanded, action.name],
    errorMessage
  }
}

export default reducer
