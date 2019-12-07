import {connect} from 'react-redux'

const mapStateToProps = (state, props) => {
  return {
    wasModified: state.wasModified,
    range: state.range,
    callback: props.callback
  }
}

const mapDispatchToProps = {}

const View = props => {
  const {range, wasModified, callback} = props

  if (callback) {
    callback(wasModified, range)
  }

  return null
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
