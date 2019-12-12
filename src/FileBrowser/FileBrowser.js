import {connect} from 'react-redux'

import {
  setFileBrowserSelection,
  toggleFileBrowserExpanded,
  setFileBrowserExclusiveExpanded,
} from 'Store/actions'

import FileBrowserView from './FileBrowserView'

const mapStateToProps = (state, props) => {
  return {
    rangeWasModified: state.rangeWasModified[state.fileBrowserPath],
    fileBrowserExpanded: state.fileBrowserExpanded,
    fileBrowserPath: state.fileBrowserPath,
    directoryTree: state.directoryTree,
    onAddFileClicked: props.onAddFileClicked,
    onAddFolderClicked: props.onAddFolderClicked,
    onDeleteFileClicked: props.onDeleteFileClicked
  }
}

const mapDispatchToProps = {
  setFileBrowserSelection,
  setFileBrowserExclusiveExpanded,
  toggleFileBrowserExpanded,
}

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowserView)
