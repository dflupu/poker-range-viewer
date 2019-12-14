import {connect} from 'react-redux'

import {
  onModalShow,
  onFileBrowserInit,
  onFileBrowserClick,
} from 'Store/actions'

import FileBrowserView from './FileBrowserView'

const mapStateToProps = (state, props) => {

  const fileBrowserState = state.fileBrowsers[props.id]

  return {
    browserId: props.id,
    modifiedRanges: state.modifiedRanges[fileBrowserState?.path],
    fileBrowserExpanded: fileBrowserState?.expanded,
    fileBrowserPath: fileBrowserState?.path,
    directoryTree: fileBrowserState?.directoryTree
  }
}

const mapDispatchToProps = {
  onModalShow,
  onFileBrowserInit,
  onFileBrowserClick,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowserView)
