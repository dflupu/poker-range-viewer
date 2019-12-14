import {connect} from 'react-redux'

const mapStateToProps = (state, props) => {
  return {
    wasModified: state.wasModified,
    range: state.range,
    callback: props.callback,
    path: props.path,
  }
}

const mapDispatchToProps = {}

const View = props => {
  const {range, wasModified, path, callback} = props

  if (callback) {
    callback({value: wasModified, range, path})
  }

  return null
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
