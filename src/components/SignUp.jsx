// react
import { useState } from 'react';
// dependencies
import axios from 'axios';
// bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// server API
const SERVER = import.meta.env.VITE_API_URL;

function SignUp({ show, onHide }) {

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  function handleChange(event) {
    const formField = event.target.id;

    if (formField === 'username') {
      setUsername(event.target.value)
    } else if (formField === 'name') {
      setName(event.target.value)
    }
  }

  function handleSubmit() {
    addUser();
    onHide();
  }

  async function addUser() {
    const url = `${SERVER}/users/`;
    const user = {
      username: username,
      name: name
    }

    try {

      const response = await axios.post(url, user);

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up - Fútbol Fans</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputGroup>
            <InputGroup.Text>Username</InputGroup.Text>
            <Form.Control id='username' onChange={handleChange}></Form.Control>
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Name</InputGroup.Text>
            <Form.Control id='name' onChange={handleChange}></Form.Control>
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SignUp;
