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
    path: props.path,
    onRangeChange: props.onRangeChange,
    onRangeSave: props.onRangeSave,
    isEditting: state.isEditting,
    villainRangePath: props.villainRangePath,
    onModalShow: props.onModalShow
  }
}

const mapDispatchToProps = {
  setCardsAction,
  setIsEditting,
  setMouseDragAction,
  setSelectedCombo,
  setVillainRangePath,
  removeExtraCombos,
  updateRange
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeView)
