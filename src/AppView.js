import React from 'react'
import path from 'path'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {ResizableBox} from 'react-resizable'
import * as deck from './Lib/deck'
import * as fsutil from './Lib/fsutil'
import AskFilenameModal from './Modals/AskFilename'
import YesNoModal from './Modals/YesNo'
import FileBrowser from './FileBrowser/FileBrowser'
import Range from './Range'
import './App.css'

const dataFolderPath = 'data'

const getRelativePath = p => {
  return path.relative(dataFolderPath, path.join(dataFolderPath, p))
}

const getActualPath = p => {
  return path.join(dataFolderPath, p)
}

const App = props => {

  const {
    fileBrowserPath,
    fileBrowserPathIsDir,
    savedRanges,
  } = props

  const [modalData, setModalData] = React.useState({open: false})
  const dataLoadingCallbacks = useDataLoadingCallbacks(props)
  const rangeCallbacks = useRangeCallbacks(props, dataLoadingCallbacks, modalData, setModalData)

  React.useEffect(() => {
    if (!fileBrowserPathIsDir) {
        dataLoadingCallbacks.loadRangeFile(fileBrowserPath)
    }
  }, [
    fileBrowserPath,
    fileBrowserPathIsDir,
    dataLoadingCallbacks
  ])

  const heroRangePath = fileBrowserPath
  const heroRange = savedRanges[fileBrowserPath]?.range
  const villainRangePath = savedRanges[fileBrowserPath]?.villainRangePath
  const villainRange = savedRanges[villainRangePath]?.range

  return (
    <Container fluid style={{padding: 0}} className="App">
      <SmallPaddingCol sm="auto" style={{float: 'left'}}>
        <ResizableBox
          width={200}
          minConstraints={[150, 100]}
          height={Infinity}
          resizeHandles={['ne', 'se']}
          axis="x"
        >
          <FileBrowser
            readDirectoryTree={rangeCallbacks.readDirectoryTree}
            onAddFileClicked={rangeCallbacks.onAddFileClicked}
            onAddFolderClicked={rangeCallbacks.onAddFolderClicked}
            onDeleteFileClicked={rangeCallbacks.onDeleteFileClicked}
          />
        </ResizableBox>
      </SmallPaddingCol>
      <Row style={{margin: 0}}>
        {heroRange &&
          <SmallPaddingCol sm="auto">
            <Range
              initial={heroRange}
              name={`Hero Range (${heroRangePath})`}
              villainRangePath={villainRangePath}
              onSave={rangeCallbacks.onSaveClicked.bind(null, heroRangePath)}
              onChange={rangeCallbacks.onRangeChange.bind(null, heroRangePath)}
              onCopyFrom={rangeCallbacks.onCopyFromClicked.bind(null, heroRangePath)}
            />
          </SmallPaddingCol>
        }

        {villainRange &&
          <SmallPaddingCol sm="auto">
            <Range
              initial={villainRange}
              name={`Villain Range (${villainRangePath})`}
              onSave={rangeCallbacks.onSaveClicked.bind(null, villainRangePath)}
              onChange={rangeCallbacks.onRangeChange.bind(null, villainRangePath)}
              onCopyFrom={rangeCallbacks.onCopyFromClicked.bind(null, villainRangePath)}
            />
          </SmallPaddingCol>
        }
      </Row>

      <AskFilenameModal
        onOk={modalData.onOk}
        onClose={modalData.onClose}
        open={modalData.open && modalData.type === 'text'}
        title={modalData.title}
      />

      <YesNoModal
        onOk={modalData.onOk}
        onClose={modalData.onClose}
        open={modalData.open && modalData.type === 'YesNo'}
        title={modalData.title}
      />
    </Container>
  )
}

const useDataLoadingCallbacks = props => {

  const {
    savedRanges,
    onRangeLoaded,
    setErrorMessage,
    resetErrorMessage,
  } = props

  const loadRangeFromPath = React.useCallback(p => {
    try {
      const range = JSON.parse(fsutil.readFile(path.join(dataFolderPath, p)))
      onRangeLoaded(p, range.range, range.villainRangePath)
      resetErrorMessage()
      return range
    } catch(err) {
      console.error(err)
      setErrorMessage(err)
    }
  }, [onRangeLoaded, setErrorMessage, resetErrorMessage])

  const loadRangeFile = React.useCallback(heroRangePath => {
    const heroRangePathRelative = getRelativePath(heroRangePath)
    let heroRange = savedRanges[heroRangePathRelative]

    if (!heroRange) {
      loadRangeFromPath(heroRangePathRelative)
    }

    const villainRangePath = heroRange?.villainRangePath

    if (villainRangePath) {
      if (!savedRanges[villainRangePath]) {
          loadRangeFromPath(villainRangePath)
      }
    }
  }, [savedRanges, loadRangeFromPath])

  const readDirectoryTree = React.useCallback(() => {
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
  }, [])

  return {
    loadRangeFile,
    loadRangeFromPath,
    readDirectoryTree
  }
}

const useRangeCallbacks = (props, dataLoadingCallbacks, modalData, setModalData) => {
  const {
    fileBrowserPath,
    fileBrowserPathIsDir,
    onRangeSaved,
    onRangeAdded,
    setRangeModified,
    setFileBrowserSelection,
    setDiskFilesModified
  } = props

  const {
    loadRangeFromPath,
    readDirectoryTree
  } = dataLoadingCallbacks

  const onSaveClicked = React.useCallback((rangePath, range, villainRangePath) => {
    fsutil.writeFile(getActualPath(rangePath), JSON.stringify({range, villainRangePath}))
    onRangeSaved(rangePath, range, villainRangePath)
    setDiskFilesModified(true)
  }, [setDiskFilesModified, onRangeSaved])

  const onCopyFromClicked = React.useCallback(rangePath => {
    setModalData({
      open: true,
      type: 'text',
      onOk: otherRangePath => {
        const otherRange = loadRangeFromPath(otherRangePath)

        fsutil.writeFile(getActualPath(rangePath), JSON.stringify({range: otherRange.range, villainRangePath: ''}))
        onRangeSaved(rangePath, otherRange.range, '')
        setDiskFilesModified(true)
        setModalData({open: false})
      },
      onClose: () => setModalData({open: false}),
      title: 'Relative path'
    })
  }, [loadRangeFromPath, onRangeSaved, setDiskFilesModified, setModalData])

  const onAddFolderClicked = React.useCallback(() => {
    setModalData({
      open: true,
      type: 'text',
      onOk: name => {
        const directory = fileBrowserPathIsDir ? fileBrowserPath : path.dirname(fileBrowserPath)
        fsutil.mkdir(path.join(directory, name))
        setDiskFilesModified(true)
        setModalData({open: false})
      },
      onClose: () => setModalData({open: false}),
      title: 'Folder name'
    })
  }, [fileBrowserPath, fileBrowserPathIsDir, setDiskFilesModified, setModalData])

  const onAddFileClicked = React.useCallback(() => {
    setModalData({
      open: true,
      type: 'text',
      onOk: filename => {
        const dir = fileBrowserPathIsDir ? fileBrowserPath : path.dirname(fileBrowserPath)
        const savePath = path.join(dir, filename)

        fsutil.writeFile(getActualPath(savePath), JSON.stringify({range: deck.asDict, villainRangePath: ''}))
        onRangeAdded(savePath, deck.asDict, '')
        setDiskFilesModified(true)
        setModalData({open: false})
      },
      onClose: () => setModalData({open: false}),
      title: 'Filename'
    })
  }, [fileBrowserPath, fileBrowserPathIsDir, onRangeAdded, setDiskFilesModified, setModalData])

  const onDeleteFileClicked = React.useCallback(() => {
    setModalData({
      open: true,
      type: 'YesNo',
      onOk: () => {
        if (fileBrowserPathIsDir) {
          return
        }

        fsutil.unlinkFile(getActualPath(fileBrowserPath))
        const parentDir = path.join(fileBrowserPath, '..')
        setFileBrowserSelection(parentDir, fsutil.isDirectory(getActualPath(parentDir)))
        setDiskFilesModified(true)
        setModalData({open: false})
      },
      onClose: () => setModalData({open: false}),
      title: 'Are you sure you want to delete this range?'
    })
  }, [
    fileBrowserPath,
    fileBrowserPathIsDir,
    setFileBrowserSelection,
    setDiskFilesModified,
    setModalData
  ])

  const onRangeChange = React.useCallback((rangePath, modified) => {
    setRangeModified(rangePath, modified)
  }, [setRangeModified])

  return {
    modalData,
    setModalData,
    onSaveClicked,
    onCopyFromClicked,
    onAddFileClicked,
    onAddFolderClicked,
    onDeleteFileClicked,
    onRangeChange,
    readDirectoryTree
  }
}

const SmallPaddingCol = styled(Col)`
  padding: 2px;
`

export default App
