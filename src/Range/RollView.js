import React from 'react'
import styled from 'styled-components'

const RollView = props => {
  const {selectedCombo, setSelectedCombo} = props

  React.useEffect(() => {
    if (selectedCombo !== null) {
      const timeout = setTimeout(() => setSelectedCombo(null), 4500)
      return () => clearTimeout(timeout)
    }
  }, [setSelectedCombo, selectedCombo])

  if (selectedCombo === null) {
    return null
  }

  const actions = props.selectedComboActions
  const randomValue = Math.random() * 100

  let result = 'Fold'
  let fontColor = '#7FDBFF'

  if (randomValue <= actions.raise) {
    result = 'Raise'
    fontColor = '#ff7043'
  } else if (randomValue <= actions.raise + actions.call) {
    result = 'Call'
    fontColor = '#2ECC40'
  }

  const StyledDisplay = styled.div`
    color: ${fontColor};
    font-size: 24px;
    font-weight: bold;
    padding-top: 15px;
  `

  return (
    <StyledDisplay>
      {selectedCombo}: {result}
    </StyledDisplay>
  )
}

export default RollView
