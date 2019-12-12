import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'

import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'

const BottomButtonsView = props => {

  const [villainRangeField, setVillainRangeField] = React.useState(props.villainRangePath)
  const [villainRangeFieldModified, setVillainRangeFieldModified] = React.useState(false)

  const setVillainRangeFieldCallback = React.useCallback(ev => {
    setVillainRangeFieldModified(true)
    setVillainRangeField(ev.target.value)
  }, [setVillainRangeField])

  if (!villainRangeFieldModified && villainRangeField !== props.villainRangePath) {
    setVillainRangeField(props.villainRangePath)
  }

  const copyRangeToClipboard = React.useCallback(includedActions => {
    let output = ''

    for (const [combo, comboActions] of Object.entries(props.range)) {
      let includedActionsPercentage = 0

      for (const action of includedActions) {
        includedActionsPercentage += comboActions[action]
      }

      if (includedActionsPercentage === 0) {
        continue
      }

      if (comboActions.remove > 0) {
        includedActionsPercentage = (includedActionsPercentage * (100 - comboActions.remove)) / 100
      }

      const weight = includedActionsPercentage / 100

      if (includedActionsPercentage > 0 && weight > 0) {
        output += `${combo}:${weight.toFixed(1)},`
      }
    }

    if (output.length > 0) {
      output = output.slice(0, -1)
    }

    navigator.clipboard.writeText(output)
  }, [props.range])

  const renderDefaultView = () => {
    return (
      <div style={{marginTop: '15px'}}>
        <EditOutlinedIcon onClick={() => props.setIsEditting(true)} style={{cursor: 'pointer'}}>
          Edit
        </EditOutlinedIcon>
        <Dropdown style={{display: 'inline-block', marginLeft: '10px'}}>
          <Dropdown.Toggle as={FileCopyOutlinedIcon} style={{cursor: 'pointer'}} />

          <Dropdown.Menu>
              <Dropdown.Item onClick={() => copyRangeToClipboard(['raise', 'call'])}>Raise + Call</Dropdown.Item>
              <Dropdown.Item onClick={() => copyRangeToClipboard(['raise'])}>Raise</Dropdown.Item>
              <Dropdown.Item onClick={() => copyRangeToClipboard(['call'])}>Call</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }

  const renderEdittingView = () => {
    return (
      <div>
        <VillainRangeDiv>
          <VillainRangeLabel>
            Villain range
          </VillainRangeLabel>

          <FormControl
            size="sm"
            value={villainRangeField}
            onChange={setVillainRangeFieldCallback}
            key="villainRangeField"
          />
        </VillainRangeDiv>

        <ButtonContainer>
          <ButtonCol>
            <BottomButton variant="dark" onClick={props.onCopyFrom}>
              Copy from
            </BottomButton>
          </ButtonCol>

          <ButtonCol>
            <BottomButton variant="dark" onClick={props.onRemoveExtra}>
              Remove extra
            </BottomButton>
          </ButtonCol>
        </ButtonContainer>

        <ButtonContainer>
          <ButtonCol>
            <BottomButton variant="dark" onClick={props.onClearRangeClick}>
              Clear
            </BottomButton>
          </ButtonCol>

          <ButtonCol>
            <BottomButton variant="dark" onClick={props.onResetChangesClick}>
              Reset
            </BottomButton>
          </ButtonCol>

          <ButtonCol>
            <BottomButton variant="dark" onClick={() => props.onSave(props.range, villainRangeField)}>
              Save
            </BottomButton>
          </ButtonCol>
        </ButtonContainer>
      </div>
    )
  }

  return props.isEditting ? renderEdittingView() : renderDefaultView();
}

const VillainRangeDiv = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  padding-top: 10px;
  border-top: 1px solid darkgrey;
  padding-bottom: 20px;
  border-bottom: 1px solid darkgrey;
`
const VillainRangeLabel = styled(FormLabel)`
  font-size: 14px;
`

const ButtonContainer = styled(Row)`
  width: 100%;
  padding: 0;
  margin: 0;
`

const ButtonCol = styled(Col)`
  padding: 0;
  padding-left: 3px;
`

const BottomButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  margin-right: 10px;
`

export default BottomButtonsView
