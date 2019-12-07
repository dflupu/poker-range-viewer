import React from 'react'
import Slider from '@material-ui/core/Slider'
import styled from 'styled-components'
import Button from './Button'

const StyledActionButton = styled(Button)`
  margin-bottom: 10px;
  margin-right: 10px;
  width: 9vw;
`

const ActionButtonsView = props => {
  const actionButtons = ['raise', 'call', 'fold', 'remove'].map(actionName => {
    let variant = 'outline-dark'

    if (props.selectedAction === actionName) {
      variant = 'dark'
    }

    return (
      <StyledActionButton
        variant={variant}
        onClick={() => props.setActionName(actionName)}
        key={actionName}
      >
        {actionName.charAt(0).toUpperCase() + actionName.slice(1)}
      </StyledActionButton>
    )
  })

  const marks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(m => {
    return {value: m, label: `${m}`}
  })

  return (
    <div>
      <div>
        {actionButtons}
      </div>
      <div>
        <Slider
          min={0}
          max={100}
          marks={marks}
          step={10}
          defaultValue={100}
          key="slider"
          onChange={(_, value) => props.setActionWeight(value)}
          style={{width: '80%', marginLeft: '10%', color: 'black'}}
        />
      </div>
    </div>
  )
}

export default ActionButtonsView
