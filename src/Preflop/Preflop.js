import PreflopView from './PreflopView'
import {connect} from 'react-redux'

import {
  setErrorMessage,
  resetErrorMessage,
  onRangeCopyFrom,
  onRangeLoad,
  onRangeSave,
  onRangeChange,
  onAddFolder,
  onAddFile,
  onDeleteFile,
  onModalShow,
  onModalHide,
} from 'Store/actions'

const mapStateToProps = state => {
  const id = 'Preflop'

  return {
    fileBrowserPath: state.fileBrowsers[id]?.path,
    fileBrowserPathIsDir: state.fileBrowsers[id]?.pathIsDir,
    savedRanges: state.savedRanges
  }
}

const mapDispatchToProps = {
  setErrorMessage,
  resetErrorMessage,
  onRangeCopyFrom,
  onRangeLoad,
  onRangeSave,
  onRangeChange,
  onAddFolder,
  onAddFile,
  onDeleteFile,
  onModalShow,
  onModalHide,
}

export default connect(mapStateToProps, mapDispatchToProps)(PreflopView)
