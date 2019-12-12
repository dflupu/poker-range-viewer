export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export const SET_FILE_BROWSER_SELECTION = 'SET_FILE_BROWSER_SELECTION'
export const TOGGLE_FILE_BROWSER_EXPANDED = 'SET_FILE_BROWSER_EXPANDED'
export const SET_FILE_BROWSER_EXCLUSIVE_EXPANDED = 'SET_FILE_BROWSER_EXCLUSIVE_EXPANDED'

export const ON_RANGE_LOAD = 'ON_RANGE_LOADED'
export const ON_RANGE_COPY_FROM = 'ON_RANGE_COPY_FROM'
export const ON_ADD_FOLDER = 'ON_ADD_FOLDER'
export const ON_ADD_FILE = 'ON_ADD_FILE'
export const ON_DELETE_FILE = 'ON_DELETE_FILE'
export const SET_RANGE_MODIFIED = 'SET_RANGE_MODIFIED'
export const ON_RANGE_SAVE = 'ON_RANGE_SAVED'
export const ON_RANGE_ADDED = 'ON_RANGE_ADDED'
export const ON_DISK_FILES_MODIFIED = 'ON_DISK_FILES_MODIFIED'

export const setFileBrowserSelection = (path, isDir) => {
  return {type: SET_FILE_BROWSER_SELECTION, path, isDir}
}

export const onRangeCopyFrom = (currentRangePath, otherRangePath) => {
  return {type: ON_RANGE_COPY_FROM, currentRangePath, otherRangePath}
}

export const onRangeLoad = name => {
  return {type: ON_RANGE_LOAD, name}
}

export const onAddFolder = name => {
  return {type: ON_ADD_FOLDER, name}
}

export const onAddFile = name => {
  return {type: ON_ADD_FILE, name}
}

export const onDeleteFile = () => {
  return {type: ON_DELETE_FILE}
}

export const onRangeSave = (name, range, villainRangePath) => {
  return {type: ON_RANGE_SAVE, name, range, villainRangePath}
}

export const onRangeAdded = (name, range, villainRangePath) => {
  return {type: ON_RANGE_ADDED, name, range, villainRangePath}
}

export const setErrorMessage = errorMessage => {
  return {type: SET_ERROR_MESSAGE, errorMessage}
}

export const resetErrorMessage = () => {
  return {type: RESET_ERROR_MESSAGE}
}

export const toggleFileBrowserExpanded = (node) => {
  return {type: TOGGLE_FILE_BROWSER_EXPANDED, node}
}

export const setRangeModified = (name, value) => {
  return {type: SET_RANGE_MODIFIED, name, value}
}

export const setFileBrowserExclusiveExpanded = (node, peerNodes) => {
  return {type: SET_FILE_BROWSER_EXCLUSIVE_EXPANDED, node, peerNodes}
}
