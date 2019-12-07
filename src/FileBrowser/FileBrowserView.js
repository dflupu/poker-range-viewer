import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'
import YesNoModal from 'Modals/YesNo'
import {StyledTreeView, TreeItem, TreePositionLabel} from './Tree'

import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolderOutlined'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import AddIcon from '@material-ui/icons/Add'

const FileBrowser = props => {

  const data = React.useRef(null)

  const {
    fileBrowserExpanded,
    toggleFileBrowserExpanded,
    setFileBrowserSelection,
    setFileBrowserExclusiveExpanded,
    rangeWasModified,
    diskFilesModified,
    setDiskFilesModified
  } = props

  const [modalData, setModalData] = React.useState({show: false})

  const switchNodeCallback = React.useCallback((node, peersToUnexpand, wasToggled) => {
    if (node.type === 'directory') {
      if (peersToUnexpand.length === 0 && (wasToggled || !fileBrowserExpanded.includes(node.path))) {
        toggleFileBrowserExpanded(node.path)
      } else if (peersToUnexpand) {
        setFileBrowserExclusiveExpanded(node.path, peersToUnexpand.map(p => p.path))
      }

      const rfiNode = node.children.filter(c => c.name === 'RFI')[0]

      if (rfiNode) {
        setFileBrowserSelection(rfiNode.path, rfiNode.type !== 'file')
        return
      }
    }

    setFileBrowserSelection(node.path, node.type !== 'file')
  }, [
    fileBrowserExpanded,
    toggleFileBrowserExpanded,
    setFileBrowserSelection,
    setFileBrowserExclusiveExpanded
  ])

  const handleNodeClick = React.useCallback((node, peersToUnexpand, wasToggled) => {
    if (rangeWasModified) {
      setModalData({
        show: true,
        onOk: () => {
          switchNodeCallback(node, peersToUnexpand, wasToggled)
          setModalData({show: false})
        },
        onClose: () => {
          setModalData({show: false})
        }
      })

      return false
    } else {
      switchNodeCallback(node, peersToUnexpand, wasToggled)
    }
  }, [
    rangeWasModified,
    switchNodeCallback
  ])

  if (!data.current || diskFilesModified) {
    data.current = props.readDirectoryTree()
    setDiskFilesModified(false)
    return null
  }

  const renderTree = node => {

    let childrenItems

    if (node.children && getNodePositionName(node.children[0])) {
      childrenItems = renderTreePositionLabels(node.children)
    } else {
      childrenItems = node.children?.map(child => renderTree(child))
    }

    return (
      <TreeItem
        id={node.path}
        label={node.name}
        key={node.path}
        isExpandable={node.type === 'directory'}
        onClick={handleNodeClick.bind(null, node, [], false)}
        onToggle={handleNodeClick.bind(null, node, [], true)}
      >
        {childrenItems}
      </TreeItem>
    )
  }

  const renderTreePositionLabels = nodes => {
    const childrenItems = []

    for (const n of nodes) {
      if (fileBrowserExpanded.includes(n.path) && n.children) {
        for (const c of n.children) {
          childrenItems.push(renderTree(c))
        }
      }
    }

    return (
      <>
        {nodes.map(n => (
          <TreePositionLabel
            id={n.path}
            label={getNodePositionName(n)}
            key={n.path}
            isExpandable={n.type === 'directory'}
            style={{background: getNodePositionColor(n)}}
            onClick={() => handleNodeClick(n, nodes, false)}
          />)
        )}

        {childrenItems}
      </>
    )
  }

  return (
    <>
      <Card style={{
        userSelect: 'none',
        height: '100%',
        paddingTop: '10px',
        paddingBottom: '10px'
      }}>
          <StyledTreeView
            defaultExpanded={fileBrowserExpanded}
            defaultSelected={props.fileBrowserPath}
            expanded={fileBrowserExpanded}
          >
            {data.current.children.map(c => renderTree(c))}
          </StyledTreeView>

          <YesNoModal
            title="Discard changes?"
            open={modalData.show}
            onClose={modalData.onClose}
            onOk={modalData.onOk}
          />
      </Card>

      <AddButtons
        onAddFileClicked={props.onAddFileClicked}
        onAddFolderClicked={props.onAddFolderClicked}
        onDeleteFileClicked={props.onDeleteFileClicked}
      />
    </>
  )
}

const AddButtons = props => {
  const ButtonCol = styled(Col)`
    margin: 0;
    padding: 0;
  `

  return (
    <Card>
      <Row style={{margin: 0, padding: 0, marginLeft: '15px'}}>
        <ButtonCol>
          <AddIcon
            style={{cursor: 'pointer'}}
            onClick={() => props.onAddFileClicked()}
          />
        </ButtonCol>
        <ButtonCol>
          <CreateNewFolderIcon
            style={{cursor: 'pointer'}}
            onClick={() => props.onAddFolderClicked()}
          />
        </ButtonCol>
        <ButtonCol>
          <DeleteIcon
            style={{cursor: 'pointer'}}
            onClick={() => props.onDeleteFileClicked()}
          />
        </ButtonCol>
      </Row>
    </Card>
  )
}

const positionColors = {
  'UTG': '#85144b',
  'UTG+1': '#85144b',
  'UTG+2': '#85144b',
  'LJ': '#ee4035',
  'HJ': '#fe8a71',
  'MP': '#fe8a71',
  'MP+1': '#f9caa7',
  'CO': '#f9caa7',
  'BN': '#f4b6c2',
  'BU': '#f4b6c2',
  'SB': '#83d0c9',
  'SB Limp': '#83d0c9',
  'BB': '#f6cd61',
  'BB after Limp': '#f6cd61'
}

const getNodePositionName = node => {
  const positionName = node.name
  return positionColors[positionName] ? positionName : null
}

const getNodePositionColor = node => {
  return positionColors[getNodePositionName(node)]
}

export default FileBrowser
