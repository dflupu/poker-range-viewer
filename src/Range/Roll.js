import {connect} from 'react-redux'
import {setSelectedCombo} from './Store/actions'
import RollView from './RollView'

const mapStateToProps = state => {
  return {
    selectedCombo: state.selectedCombo,
    selectedComboActions: state.range[state.selectedCombo]
  }
}

const mapDispatchToProps = {
  setSelectedCombo
}

export default connect(mapStateToProps, mapDispatchToProps)(RollView)
