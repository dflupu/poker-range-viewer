import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'
import * as deck from 'Lib/deck'
import ComboCount from './ComboCount'
import Cards from './Cards'
import Roll from './Roll'
import ActionButtons from './ActionButtons'
import BottomButtons from './BottomButtons'
import OnChangeCallback from './OnChangeCallback'

const RangeView = props => {
  const {
    initial,
    name,
    path,
    updateRange,
    villainRangePath,
    onRangeChange,
    onRangeSave,
    isEditting,
    setVillainRangePath,
    removeExtraCombos,
    onModalShow
  } = props

  React.useEffect(() => {
    if (initial && Object.keys(initial).length > 0) {
      updateRange(initial)
    }

    if (villainRangePath) {
      setVillainRangePath(villainRangePath)
    }
  }, [initial, updateRange, villainRangePath, setVillainRangePath])

  const onResetChangesClick = () => {
    if (initial && Object.keys(initial).length > 0) {
      updateRange(initial)
    } else {
      updateRange(deck.asDict)
    }
  }

  const onClearRangeClick = () => {
    updateRange(deck.asDict)
  }

  const cardRows = []

  for (const deckRow of deck.asArray) {
    const row = []

    for (const cards of deckRow) {
      row.push(<CardCol key={cards}><Cards name={cards} /></CardCol>)
    }

    cardRows.push(<CardRow key={deckRow[0][1]}>{row}</CardRow>)
  }

  return (
    <Container>
      {isEditting &&
        <ActionButtons />
      }

      <StyledRangeView>
        <RangeTitle>{name.replace(/Cash\//g, '')}</RangeTitle>

        <CardsDiv>
          {cardRows}
        </CardsDiv>

        <ComboCount />

        <BottomButtons
          rangePath={path}
          onResetChangesClick={onResetChangesClick}
          onClearRangeClick={onClearRangeClick}
          onCopyFrom={onModalShow.bind(null, 'ON_RANGE_COPY_FROM', path)}
          onSave={onRangeSave}
          onRemoveExtra={removeExtraCombos}
        />

      </StyledRangeView>

      <Roll />
      <OnChangeCallback initial={initial} path={path} callback={onRangeChange} />
    </Container>
  )
}

const CardRow = styled(Row)`
  padding: 0;
  margin: 0;
`

const CardCol = styled(Col)`
  padding: 0;
  margin: 1px;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const StyledRangeView = styled(Card)`
  margin-bottom: 10px;
  padding: 10px;
`

const CardsDiv = styled.div`
  min-width: 400px;
  min-height: 400px;
  width: 35vmax;
  height: 35vmax;
`

const RangeTitle = styled.div`
  margin-bottom: 10px;
  text-align: center;
  font-size: 15px;
  font-weight: 445;
`

export default RangeView
