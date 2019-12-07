import React from 'react'
import BButton from 'react-bootstrap/Button'

const Button = props => {
  return (
    <BButton size="small" color="primary" {...props}>
      {props.children}
    </BButton>
  )
}

export default Button
