// react
import { useState } from 'react';
// dependencies
import axios from 'axios';
// bootstrap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// server API
const SERVER = import.meta.env.VITE_API_URL;
// league and team data
import leaguesDictionary from '../../config/leagues';

function Profile({ user, updateUser }) {

  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [colorTheme, setColorTheme] = useState(user.colorTheme);

  function handleChange(event) {
    const formField = event.target.id;

    if (formField === 'username') {
      setUsername(event.target.value);
    } else if (formField === 'name') {
      setName(event.target.value);
    } else if (formField === 'colorTheme') {
      setColorTheme(event.target.value);
    }
  }

  async function updateUserProfile() {
    const url = `${SERVER}/users/${user._id}`;
    const userProfile = {
      username: username,
      name: name,
      colorTheme: colorTheme
    }

    try {

      const response = await axios.put(url, userProfile);

      updateUser(response.data);

    } catch (error) {
      console.error(error.message);
    }

  }

  return (
    <Container>

      <h2>Profile</h2>

      <Form>
        <InputGroup>
          <InputGroup.Text>Username</InputGroup.Text>
          <Form.Control id='username' onChange={handleChange} value={username}></Form.Control>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Name</InputGroup.Text>
          <Form.Control id='name' onChange={handleChange} value={name}></Form.Control>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Favorite League</InputGroup.Text>
          <Form.Select>

          </Form.Select>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Favorite Team</InputGroup.Text>
          <Form.Select>

          </Form.Select>
        </InputGroup>
        <Button onClick={updateUserProfile}>Update</Button>
      </Form>

    </Container>
  );
}

export default Profile;
