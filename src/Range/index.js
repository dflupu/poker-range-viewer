import React from 'react'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './Store/reducer'
import Range from './Range'

const RangeWrapper = props => {
  const store = createStore(reducer)

  return (
    <Provider store={store}>
      <Range {...props} />
    </Provider>
  )
}

export default RangeWrapper
