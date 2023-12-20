// bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function SignUp({ show, onHide }) {

  function handleSubmit() {
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up - Fútbol Fans</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignUp;
