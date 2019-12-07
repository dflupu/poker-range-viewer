import * as deck from 'Lib/deck'
import * as actions from './actions'

const initialState = {
  range: deck.asDict,
  isEditting: false,
  actionName: 'raise',
  actionWeight: 100,
  dragAction: 'set',
  selectedCombo: null,
  wasModified: false,
  villainRangePath: ''
}

const reducer = (state=initialState, action) => {

  switch (action.type) {
    case actions.UPDATE_RANGE:
      return {...state, range: {...state.range, ...action.range}}
    case actions.RESET_CHANGES:
      return {...state, wasModified: false}
    case actions.SET_IS_EDITTING:
      return {...state, isEditting: action.value}
    case actions.SET_ACTION_NAME:
      return {...state, actionName: action.actionName}
    case actions.SET_ACTION_WEIGHT:
      return {...state, actionWeight: action.actionWeight}
    case actions.SET_VILLAIN_RANGE_PATH:
      return {...state, villainRangePath: action.value}
    case actions.SET_CARDS_ACTION:
      let {actionName, actionWeight, dragAction} = state
      const {cards} = action
      const currentWeight = state.range[cards][actionName]

      if (action.onClick) {
        if (currentWeight === actionWeight) {
          dragAction = 'unset'
          actionWeight = 0
        } else {
          dragAction = 'set'
        }
      } else if (dragAction === 'unset') {
        actionWeight = 0
      }

      return {
        ...state,
        dragAction,
        wasModified: true,
        range: {
          ...state.range,
          [cards]: setWeight(state.range[cards], actionName, actionWeight)
        }
      }
    case actions.SET_MOUSE_DRAG_ACTION:
      return {...state, dragAction: 'set'}
    case actions.SET_SELECTED_COMBO:
      return {...state, selectedCombo: action.combo}
    case actions.REMOVE_EXTRA_COMBOS:
      return {...state, range: removeExtraCombos(state.range), wasModified: true}
    default:
      break
  }

  return state
}

function removeExtraCombos(range) {

  const updatedRange = {}

  for (const [combo, actions] of Object.entries(range)) {
    const toRemove = 100 - getTotalWeight(actions) + actions.fold

    if (toRemove === 0) {
      updatedRange[combo] = actions
      continue
    }

    let newCallPerc = 0
    let newRaisePerc = 0

    if (actions.call && actions.raise) {
      const raisePerc = actions.raise
      const callPerc = actions.call

      const raiseOverCall = raisePerc / callPerc

      newCallPerc = 100 / (raiseOverCall + 1)
      newRaisePerc = 100 - newCallPerc
    } else if (actions.call) {
      newCallPerc = 100
    } else if (actions.raise) {
      newRaisePerc = 100
    }

    updatedRange[combo] = {
      remove: toRemove,
      fold: 0,
      raise: newRaisePerc || 0,
      call: newCallPerc || 0
    }
  }

  return updatedRange
}

function setWeight(comboActions, action, weight) {
  const result = {...comboActions, [action]: weight}
  let totalWeight

  if (action === 'remove') {
    return result
  }

  while ((totalWeight = getTotalWeight(result)) > 100) {
    const extraWeight = totalWeight - 100
    for (let [itrAction] of Object.entries(result)) {
      if (itrAction !== action && itrAction !== 'remove' && result[itrAction] > 0) {
        result[itrAction] -= extraWeight

        if (result[itrAction] < 0) {
          result[itrAction] = 0
        }

        break
      }
    }
  }

  return result
}

function getTotalWeight(comboActions) {
  let totalWeight = 0

  for (let data of Object.entries(comboActions)) {
    if (data[0] === 'remove') {
      continue
    }

    totalWeight += data[1]
  }

  return totalWeight
}

export default reducer
