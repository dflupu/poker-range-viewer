import * as actions from './actions'

const initialState = {
  fileBrowserPath: '',
  fileBrowserPathIsDir: true,
  fileBrowserExpanded: [],
  rangeWasModified: {},
  errorMessage: null,
  savedRanges: {},
  diskFilesModified: true
}

const reducer = (state=initialState, action) => {

  switch (action.type) {
    case actions.SET_FILE_BROWSER_SELECTION:
      return {
        ...state,
        fileBrowserPath: action.path,
        fileBrowserPathIsDir: action.isDir
      }
    case actions.ON_RANGE_ADDED:
      return {
        ...state,
        rangeWasModified: {
          ...state.rangeWasModified,
          [action.name]: false
        },
        fileBrowserPath: action.name,
        fileBrowserPathIsDir: false,
        fileBrowserExpanded: [...state.fileBrowserExpanded, state.fileBrowserPath],
        savedRanges: {
          ...state.savedRanges,
          [action.name]: {range: action.range, villainRangePath: action.villainRangePath}
        }
      }
    case actions.ON_RANGE_SAVED:
      return {
        ...state,
        rangeWasModified: {
          ...state.rangeWasModified,
          [action.name]: false
        },
        savedRanges: {
          ...state.savedRanges,
          [action.name]: {range: action.range, villainRangePath: action.villainRangePath}
        }
      }
    case actions.ON_RANGE_LOADED:
      return {
        ...state,
        rangeWasModified: {
          ...state.rangeWasModified,
          [action.name]: false
        },
        savedRanges: {
          ...state.savedRanges,
          [action.name]: {range: action.range, villainRangePath: action.villainRangePath}
        },
        fileBrowserExpanded: [...state.fileBrowserExpanded, action.name],
      }
    case actions.TOGGLE_FILE_BROWSER_EXPANDED:
      if (state.fileBrowserExpanded.includes(action.node)) {
        return {...state, fileBrowserExpanded: state.fileBrowserExpanded.filter(x => x !== action.node)}
      } else {
        return {...state, fileBrowserExpanded: [...state.fileBrowserExpanded, action.node]}
      }
    case actions.SET_FILE_BROWSER_EXCLUSIVE_EXPANDED:
      const expanded = state.fileBrowserExpanded.filter(x => !action.peerNodes.includes(x))
      return {...state, fileBrowserExpanded: [...expanded, action.node]}
    case actions.SET_ERROR_MESSAGE:
      return {...state, errorMessage: action.errorMessage}
    case actions.RESET_ERROR_MESSAGE:
      return {...state, errorMessage: null}
    case actions.SET_RANGE_MODIFIED:
      return {
        ...state,
        rangeWasModified: {
          ...state.rangeWasModified,
          [action.name]: action.value
        }
      }
    case actions.ON_DISK_FILES_MODIFIED:
      return {
        ...state,
        diskFilesModified: action.value
      }
    default:
      break
  }

  return state
}

export default reducer
