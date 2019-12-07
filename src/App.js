import AppView from 'AppView'
import {connect} from 'react-redux'

import {
  setErrorMessage,
  resetErrorMessage,
  setRangeModified,
  onRangeAdded,
  onRangeSaved,
  onRangeLoaded,
  setFileBrowserSelection,
  setDiskFilesModified
} from './Store/actions'

const mapStateToProps = state => {
  return {
    fileBrowserPath: state.fileBrowserPath,
    fileBrowserPathIsDir: state.fileBrowserPathIsDir,
    savedRanges: state.savedRanges
  }
}

const mapDispatchToProps = {
  setErrorMessage,
  resetErrorMessage,
  setRangeModified,
  onRangeAdded,
  onRangeSaved,
  onRangeLoaded,
  setFileBrowserSelection,
  setDiskFilesModified
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView)
