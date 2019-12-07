import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

const ComboCountView = props => {
  const total = {raise: 0, call: 0, fold: 0, range: 0}

  for (const [combo, actions] of Object.entries(props.range)) {
    let comboCount = 6

    if (combo.endsWith('s')) {
      comboCount = 4
    } else if (combo.endsWith('o')) {
      comboCount = 12
    }

    comboCount -= comboCount * (actions.remove / 100)

    for (const [action, weight] of Object.entries(actions)) {
      if (weight > 0) {
        total[action] += Math.round((comboCount * weight) / 100)
      }
    }

    total.range += comboCount
  }

  const percentages = {
    raise: ((total.raise / total.range) * 100),
    call: ((total.call / total.range) * 100),
    fold: ((total.fold / total.range) * 100),
    range: ((total.range / 1314) * 100)
  }

  const percentagesFromAllCombos = {
    raise: ((total.raise / 1314) * 100),
    call: ((total.call / 1314) * 100),
    fold: ((total.fold / 1314) * 100),
  }

  for (const [k, v] of Object.entries(percentages)) {
    percentages[k] = v.toFixed(2).replace('.00', '')
  }

  for (const [k, v] of Object.entries(percentagesFromAllCombos)) {
    percentagesFromAllCombos[k] = v.toFixed(2).replace('.00', '')
  }

  for (const [k, v] of Object.entries(total)) {
    total[k] = v.toFixed(2).replace('.00', '')
  }

  return (
    <MainDiv>
      <Row>
        <Col>
          Raise:
          <BoldText>
            {total.raise} (
            {percentages.raise}%
            {percentagesFromAllCombos.raise !== percentages.raise && ', ' + percentagesFromAllCombos.raise + '%'}
            )
          </BoldText>
        </Col>
        <Col>
          Fold:
          <BoldText>
            {total.fold} ({percentages.fold}%)
          </BoldText>
        </Col>
      </Row>
      <Row>
        <Col>
          Call:
          <BoldText>
            {total.call} (
              {percentages.call}%
              {percentagesFromAllCombos.call !== percentages.call && ', ' + percentagesFromAllCombos.call + '%'}
            )
          </BoldText>
        </Col>
        <Col>
          Range:
          <BoldText>
            {total.range} ({percentages.range}%)
          </BoldText>
        </Col>
      </Row>
    </MainDiv>
  )
}

const MainDiv = styled.div`
  margin-top: 10px;
`

const BoldText = styled.span`
  font-weight: bold;
  margin-left: 3px;
  margin-right: 10px;
`

export default ComboCountView
