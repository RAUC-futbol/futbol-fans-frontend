// react
import { useState } from 'react';
// dependencies
import axios from 'axios';
// bootstrap
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
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

  function handleSubmit(event) {
    event.preventDefault();
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
        <Form onSubmit={handleSubmit}>
          <Stack gap={3}>
            <FloatingLabel label='username'>
              <Form.Control id='username' onChange={handleChange} placeholder='username'></Form.Control>
            </FloatingLabel>
            <FloatingLabel label='name'>
              <Form.Control id='name' onChange={handleChange} placeholder='name'></Form.Control>
            </FloatingLabel>
            <Button type='submit' variant='success'>Sign Up</Button>
          </Stack>

        </Form>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  )
}

export default SignUp;
