import {connect} from 'react-redux'

import {
  setFileBrowserSelection,
  toggleFileBrowserExpanded,
  setFileBrowserExclusiveExpanded,
  setDiskFilesModified
} from 'Store/actions'

import FileBrowserView from './FileBrowserView'

const mapStateToProps = (state, props) => {
  return {
    readDirectoryTree: props.readDirectoryTree,
    rangeWasModified: state.rangeWasModified[state.fileBrowserPath],
    fileBrowserExpanded: state.fileBrowserExpanded,
    fileBrowserPath: state.fileBrowserPath,
    diskFilesModified: state.diskFilesModified,
    onAddFileClicked: props.onAddFileClicked,
    onAddFolderClicked: props.onAddFolderClicked,
    onDeleteFileClicked: props.onDeleteFileClicked
  }
}

const mapDispatchToProps = {
  setFileBrowserSelection,
  setFileBrowserExclusiveExpanded,
  toggleFileBrowserExpanded,
  setDiskFilesModified
}

export default connect(mapStateToProps, mapDispatchToProps)(FileBrowserView)
