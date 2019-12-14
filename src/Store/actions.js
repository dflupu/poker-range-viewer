import {createAction} from '@reduxjs/toolkit'

export const onModalShow = createAction('ON_MODAL_SHOW')
export const onModalHide = createAction('ON_MODAL_HIDE')

export const onAddFolder = createAction('ON_ADD_FOLDER')
export const onAddFile = createAction('ON_ADD_FILE')
export const onDeleteFile = createAction('ON_DELETE_FILE')

export const onRangeLoad = createAction('ON_RANGE_LOAD')
export const onRangeSave = createAction('ON_RANGE_SAVE')
export const onRangeChange = createAction('ON_RANGE_CHANGE')
export const onRangeCopyFrom = createAction('ON_RANGE_COPY_FROM')

export const setErrorMessage = createAction('SET_ERROR_MESSAGE')
export const resetErrorMessage = createAction('RESET_ERROR_MESSAGE')

export const onFileBrowserInit = createAction('ON_FILE_BROWSER_INIT')
export const onFileBrowserClick = createAction('ON_FILE_BROWSER_CLICK')
