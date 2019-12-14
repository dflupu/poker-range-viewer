import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'
import {ResizableBox} from 'react-resizable'
import {StyledTreeView, TreeItem, TreePositionLabel} from './Tree'

import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolderOutlined'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import AddIcon from '@material-ui/icons/Add'

const FileBrowser = props => {

  const {
    browserId,
    fileBrowserPath,
    fileBrowserExpanded,
    onFileBrowserInit,
    onFileBrowserClick,
    modifiedRanges,
    onModalShow
  } = props

  React.useEffect(() => {
    if (fileBrowserPath === undefined) {
      onFileBrowserInit({browserId})
    }
  }, [browserId, onFileBrowserInit, fileBrowserPath])

  if (fileBrowserPath === undefined) {
    return null
  }

  const handleNodeClick = (node, peersToUnexpand, wasToggled) => {
    if (modifiedRanges) {
      onModalShow({id: 'ASK_DISCARD_CHANGES', node, peersToUnexpand, wasToggled})
      return false
    } else {
      onFileBrowserClick({browserId, node, peersToUnexpand, wasToggled})
    }
  }

  const renderTree = node => {
    let childrenItems

    if (node.children?.length > 0 && getNodePositionName(node.children[0])) {
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
    <ResizableBox
      width={200}
      minConstraints={[150, 100]}
      height={Infinity}
      resizeHandles={['ne', 'se']}
      axis="x"
    >
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
            {props.directoryTree.children.map(c => renderTree(c))}
          </StyledTreeView>
      </Card>

      <AddButtons
        onAddFileClicked={() => onModalShow({id: 'ON_PREFLOP_ADD_FILE'})}
        onAddFolderClicked={() => onModalShow({id: 'ON_PREFLOP_ADD_FOLDER'})}
        onDeleteFileClicked={() => onModalShow({id: 'ON_PREFLOP_DELETE_FILE'})}
      />
    </ResizableBox>
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
  'BB after Limp': '#f6cd61',
  'test': '#ffffff'
}

const getNodePositionName = node => {
  const positionName = node.name
  return positionColors[positionName] ? positionName : null
}

const getNodePositionColor = node => {
  return positionColors[getNodePositionName(node)] ?? positionColors['Other']
}

export default FileBrowser
