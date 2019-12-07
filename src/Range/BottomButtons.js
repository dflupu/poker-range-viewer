import {connect} from 'react-redux'
import {setIsEditting} from './Store/actions'
import BottomButtonsView from './BottomButtonsView'

const mapStateToProps = (state, props) => {
  return {
    range: state.range,
    villainRangePath: state.villainRangePath,
    isEditting: state.isEditting,
    onSave: props.onSave,
    onResetChangesClick: props.onResetChangesClick,
    onClearRangeClick: props.onClearRangeClick,
    onCopyFrom: props.onCopyFrom,
    onRemoveExtra: props.onRemoveExtra
  }
}

const mapDispatchToProps = {
  setIsEditting
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomButtonsView)
