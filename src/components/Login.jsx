// react
import { useState } from 'react';
// bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Login({ show, onHide }) {

  const [username, setUsername] = useState('');

  function handleChange(event) {
    setUsername(event.target.value)
  }

  function handleSubmit() {
    setUser();
    onHide();
  }

  async function setUser() {
    console.log(username);
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Login - Fútbol Fans</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputGroup>
            <InputGroup.Text>Username</InputGroup.Text>
            <Form.Control onChange={handleChange}></Form.Control>
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Login;
