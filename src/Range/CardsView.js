import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  text-align: center;
  font-weight: 450;
  font-size: calc(9px + 0.3vw);
  cursor: default;
  user-select: none;
  display: inline-block;
  height: 0;
  padding-bottom: 80%;
  padding-top: 20%;
  width: 100%;
`

const CardsView = props => {
  const {
    name,
    raise,
    call,
    fold,
    remove,
    isEditting,
    setCardsAction,
    setSelectedCombo,
    ...leftOverProps
  } = props

  let background = '#fafafa'

  if (!name.endsWith('s') && !name.endsWith('o')) {
    background = '#eeeeee'
  }

  const onClick = mouseDown => {
    if (isEditting) {
      setCardsAction(name, mouseDown)
    } else {
      setSelectedCombo(name)
    }
  }

  const cardStyle = {
    background: `-webkit-linear-gradient(
      left,
      white,
      #ff7043 0%,
      #ff7043 ${raise}%,
      #a5d6a7 ${raise}%,
      #a5d6a7 ${raise + call}%,
      #DBF1FF ${raise + call}%,
      #DBF1FF ${raise + call + fold}%,
      ${background} ${raise + call + fold}%,
      ${background} 100%
    )`
  }

  let textStyle = {}

  if (remove > 0) {
    if (remove === 100) {
      textStyle = {
        opacity: 0.1
      }
    }

    cardStyle.background = `-webkit-linear-gradient(
      top,
      #F5F5F5 ${remove}%,
      rgba(0, 0, 0, 0) ${remove}%,
      rgba(0, 0, 0, 0)
    ),` + cardStyle.background
  }

  return (
    <Card
      style={cardStyle}
      onMouseDown={() => onClick(true)}
      onMouseEnter={ev => (ev.buttons === 1 && onClick())}
      {...leftOverProps}
    >
      <span style={textStyle}>
        {name}
      </span>
    </Card>
  )
}

export default CardsView
