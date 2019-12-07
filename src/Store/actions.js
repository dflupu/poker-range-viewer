export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export const SET_FILE_BROWSER_SELECTION = 'SET_FILE_BROWSER_SELECTION'
export const TOGGLE_FILE_BROWSER_EXPANDED = 'SET_FILE_BROWSER_EXPANDED'
export const SET_FILE_BROWSER_EXCLUSIVE_EXPANDED = 'SET_FILE_BROWSER_EXCLUSIVE_EXPANDED'

export const ON_RANGE_LOADED = 'ON_RANGE_LOADED'
export const SET_RANGE_MODIFIED = 'SET_RANGE_MODIFIED'
export const ON_RANGE_SAVED = 'ON_RANGE_SAVED'
export const ON_RANGE_ADDED = 'ON_RANGE_ADDED'
export const ON_DISK_FILES_MODIFIED = 'ON_DISK_FILES_MODIFIED'

export const setFileBrowserSelection = (path, isDir) => {
  return {type: SET_FILE_BROWSER_SELECTION, path, isDir}
}

export const onRangeLoaded = (name, range, villainRangePath) => {
  return {type: ON_RANGE_LOADED, name, range, villainRangePath}
}

export const onRangeSaved = (name, range, villainRangePath) => {
  return {type: ON_RANGE_SAVED, name, range, villainRangePath}
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

export const setDiskFilesModified = value => {
  return {type: ON_DISK_FILES_MODIFIED, value}
}

export const setFileBrowserExclusiveExpanded = (node, peerNodes) => {
  return {type: SET_FILE_BROWSER_EXCLUSIVE_EXPANDED, node, peerNodes}
}
