import React from 'react'

import AskFilenameModal from './AskFilename'
import YesNoModal from './YesNo'

const ModalManagerView = props => {

  const {
    id,
    args,

    onModalHide,
    onRangeCopyFrom,
    onAddFile,
    onAddFolder,
    onDeleteFile,
    onFileBrowserClick
  } = props

  const closeAfter = (f, browserId, payload, result) => {
    f({...payload, ...result, browserId})
    onModalHide()
  }

  const modalsById = {
    ON_PREFLOP_ADD_FILE: {
      callback: closeAfter.bind(null, onAddFile, 'Preflop'),
      title: 'Filename',
      type: 'filename'
    },
    ON_PREFLOP_DELETE_FILE: {
      callback: closeAfter.bind(null, onDeleteFile, 'Preflop'),
      title: 'Are you sure you want to delete this range?',
      type: 'YesNo'
    },
    ON_PREFLOP_ADD_FOLDER: {
      callback: closeAfter.bind(null, onAddFolder, 'Preflop'),
      title: 'Filename',
      type: 'filename'
    },
    ASK_DISCARD_CHANGES: {
      callback: closeAfter.bind(null, onFileBrowserClick),
      title: 'Discard changes?',
      type: 'YesNo'
    },
    ON_RANGE_COPY_FROM: {
      callback: closeAfter.bind(null, onRangeCopyFrom),
      title: 'Relative path',
      type: 'filename'
    },
  }

  const openModal = modalsById[id]

  if (!openModal) {
    return null
  }

  return (
    <>
      <AskFilenameModal
        onOk={openModal.callback.bind(null, args)}
        onClose={onModalHide}
        open={true && openModal.type === 'filename'}
        title={openModal.title}
      />

      <YesNoModal
        onOk={openModal.callback.bind(null, args)}
        onClose={onModalHide}
        open={true && openModal.type === 'YesNo'}
        title={openModal.title}
      />
    </>
  )
}

export default ModalManagerView
