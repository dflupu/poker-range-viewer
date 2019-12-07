import React from 'react'
import Modal from 'react-bootstrap/Modal'
import FormControl from 'react-bootstrap/FormControl'
import Button from './Button'

const AskFilenameModal = props => {
  const [filename, setFilename] = React.useState('')

  return (
    <Modal show={props.open} onHide={props.onClose} centered autoFocus>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          onChange={e => setFilename(e.target.value)}
          autoFocus
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => props.onOk(filename)} color="primary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AskFilenameModal
