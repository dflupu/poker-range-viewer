import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'

import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

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

  if (props.isEditting) {
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
  } else {
    return (
      <div style={{marginTop: '15px'}}>
        <EditOutlinedIcon onClick={() => props.setIsEditting(true)} style={{cursor: 'pointer'}}>
          Edit
        </EditOutlinedIcon>
      </div>
    )
  }
}

export default BottomButtonsView
