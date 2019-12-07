import {connect} from 'react-redux'
import {setActionName, setActionWeight} from './Store/actions'
import ActionButtonsView from './ActionButtonsView'

const mapStateToProps = state => {
  return {
    selectedAction: state.actionName,
    selectedActionWeight: state.actionWeight
  }
}

const mapDispatchToProps = {
  setActionName,
  setActionWeight
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtonsView)
