import {connect} from 'react-redux'

import {
  setCardsAction,
  setIsEditting,
  setMouseDragAction,
  setSelectedCombo,
  updateRange,
  removeExtraCombos,
  setVillainRangePath
} from './Store/actions'

import RangeView from './RangeView'

const mapStateToProps = (state, props) => {
  return {
    initial: props.initial,
    name: props.name,
    onChange: props.onChange,
    onSave: props.onSave,
    isEditting: state.isEditting,
    villainRangePath: props.villainRangePath
  }
}

const mapDispatchToProps = {
  setCardsAction,
  setIsEditting,
  setMouseDragAction,
  setSelectedCombo,
  updateRange,
  setVillainRangePath,
  removeExtraCombos
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeView)
