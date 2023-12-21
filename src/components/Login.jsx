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
// server API
const SERVER = import.meta.env.VITE_API_URL;

function Login({ show, onHide, updateUser }) {

  const [username, setUsername] = useState('');

  function handleChange(event) {
    setUsername(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    setUser();
    onHide();
  }

  async function setUser() {
    const url = `${SERVER}/users/${username}`;

    try {

      const response = await axios.get(url);

      updateUser(response.data[0]);

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Login - Fútbol Fans</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Stack gap={3}>
            <FloatingLabel label='username'>
              <Form.Control onChange={handleChange} placeholder='username'></Form.Control>
            </FloatingLabel>
            <Button type='submit' variant='success'>Submit</Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Login;
