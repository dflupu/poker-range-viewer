export const SET_ACTION_WEIGHT = 'SET_ACTION_WEIGHT'
export const SET_ACTION_NAME = 'SET_ACTION_NAME'
export const SET_CARDS_ACTION = 'SET_CARDS_ACTION'
export const SET_IS_EDITTING = 'SET_IS_EDITTING'
export const SET_SELECTED_COMBO = 'SET_SELECTED_COMBO'
export const SET_MOUSE_DRAG_ACTION = 'SET_MOUSE_DRAG_ACTION'
export const UPDATE_RANGE = 'UPDATE_RANGE'
export const DELETE_RANGE = 'DELETE_RANGE'
export const RESET_CHANGES = 'RESET_CHANGES'
export const SET_VILLAIN_RANGE_PATH = 'SET_VILLAIN_RANGE_PATH'
export const REMOVE_EXTRA_COMBOS = 'REMOVE_EXTRA_COMBOS'

export const setActionName = actionName => {
  return {type: SET_ACTION_NAME, actionName}
}

export const setActionWeight = actionWeight => {
  return {type: SET_ACTION_WEIGHT, actionWeight}
}

export const setCardsAction = (cards, onClick) => {
  return {type: SET_CARDS_ACTION, cards, onClick}
}

export const setMouseDragAction = () => {
  return {type: SET_MOUSE_DRAG_ACTION}
}

export const setIsEditting = value => {
  return {type: SET_IS_EDITTING, value}
}

export const resetChanges = () => {
  return {type: RESET_CHANGES}
}

export const updateRange = range => {
  return {type: UPDATE_RANGE, range}
}

export const setSelectedCombo = combo => {
  return {type: SET_SELECTED_COMBO, combo}
}

export const deleteRange = name => {
  return {type: DELETE_RANGE, name}
}

export const setVillainRangePath = value => {
  return {type: SET_VILLAIN_RANGE_PATH, value}
}

export const removeExtraCombos = () => {
  return {type: REMOVE_EXTRA_COMBOS}
}
