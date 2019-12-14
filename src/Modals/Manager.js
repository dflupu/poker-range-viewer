import {
  onModalHide,
  onRangeCopyFrom,
  onFileBrowserClick,
  onAddFile,
  onAddFolder,
  onDeleteFile,
} from 'Store/actions'

import {connect} from 'react-redux'
import View from './ManagerView'

const mapStateToProps = state => {
  return {
    id: state.modalId,
    args: state.modalArgs,
  }
}

const mapDispatchToProps = {
  onModalHide,
  onRangeCopyFrom,
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onFileBrowserClick,
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
