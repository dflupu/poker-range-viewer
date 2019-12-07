import {connect} from 'react-redux'

import ComboCountView from './ComboCountView'

const mapStateToProps = state => {
  return {range: state.range}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ComboCountView)
