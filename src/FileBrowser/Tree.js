import React from 'react'
import styled from 'styled-components'

import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const ExpandContext = React.createContext()

const TreeView = ({expanded, defaultSelected, children}) => {
  const onSelect = nodeId => {
    setProviderValue({...providerValue, selectedNode: nodeId})
  }

  const [providerValue, setProviderValue] = React.useState({
    expanded, onSelect, selectedNode: defaultSelected
  })

  if (expanded !== providerValue.expanded || defaultSelected !== providerValue.selectedNode) {
    // This is relevant on rerenders
    setProviderValue({...providerValue, expanded, selectedNode: defaultSelected})
  }

  return (
    <ExpandContext.Provider value={providerValue}>
      {children}
    </ExpandContext.Provider>
  )
}

const TreePositionLabel = ({id, label, isExpandable, onClick, style}) => {
  const {expanded, selectedNode, onSelect} = React.useContext(ExpandContext)
  const isActive = (isExpandable && expanded.includes(id)) || selectedNode === id
  const ElemType = isActive ? StyledActivePositionLabel: StyledPositionLabel

  return (
    <ElemType onClick={() => {
      if (onClick() !== false) {
        onSelect()
      }
    }} style={style}>
      {label}
    </ElemType>
  )
}

const TreeItem = ({id, label, isExpandable, onClick, onToggle, children}) => {
  const {expanded, selectedNode, onSelect} = React.useContext(ExpandContext)

  const renderExpandIcon = () => {
    const IconType = expanded.includes(id) ? ExpandMoreIcon : ChevronRightIcon
    return <IconType style={{fontSize: 16, marginRight: '6px'}} onClick={ev => {
      if (onToggle() !== false) {
        onSelect()
      }

      ev.stopPropagation()
    }} />
  }

  const renderLabel = () => {
    const ElemType = selectedNode === id ? StyledActiveTreeLabel : StyledTreeLabel

    return (
      <ElemType onClick={() => {
        if (onClick() !== false) {
          onSelect()
        }
      }}>
        {isExpandable &&
            renderExpandIcon()
        }
        {label}
      </ElemType>
    )
  }

  const renderChildren = () => {
    return expanded.includes(id) && <div style={{marginLeft: '10px'}}>{children}</div>
  }

  return (
    <div>
      {renderLabel()}
      {renderChildren()}
    </div>
  )
}

const StyledTreeView = styled(TreeView)`
  min-width: 150px;
  margin: 20px;
  padding-top: 10px;
`

const BasicLabel = styled.div`
  font-family: 'Menlo';
  font-weight: 550;

  @media (max-height: 960px) {
    font-size: 12px;
    padding-top: 2px;
    padding-left: 5px;
    padding-right: 5px;
  }

  @media (min-height: 960px) {
    font-size: 15px;
    margin-bottom: 5px;
    padding-left: 8px;
    padding-right: 8px;
  }
`
const StyledTreeLabel = styled(BasicLabel)`
  padding-left: 10px;
  padding-right: 0;
  width: 100;
  height: 22px;

`

const StyledPositionLabel = styled(BasicLabel)`
  margin: 5px;
  margin-left: 0;
  padding-top: 0;
  display: inline-block;
  vertical-align: middle;
  box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
  border-radius: 3px;
`

const StyledActivePositionLabel = styled(StyledPositionLabel)`
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
`

const StyledActiveTreeLabel = styled(StyledTreeLabel)`
  background: #0392cf !important;
  opacity: 0.8;
  border-radius: 3px;
  color: white;
`

export {StyledTreeView, TreeView, TreeItem, TreePositionLabel}
