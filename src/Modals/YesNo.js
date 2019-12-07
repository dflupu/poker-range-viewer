import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from './Button'

const YesNoModal = props => {
  return (
    <Modal show={props.open} onHide={props.onClose} centered autoFocus>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button onClick={props.onClose} color="primary">
          No
        </Button>
        <Button onClick={() => props.onOk()} color="primary">
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default YesNoModal
