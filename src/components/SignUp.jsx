// dependencies
import axios from 'axios';
// bootstrap
import Modal from 'react-bootstrap/Modal';
// server API
const SERVER = import.meta.env.VITE_API_URL;
// components
import ProfileForm from '../components/ProfileForm';

function SignUp({ show, onHide, updateUser }) {

  const user = {
    username: '',
    name: '',
    favLeague: 2021,
    favTeam: 57
  }

  async function addUser(userProfile) {
    const url = `${SERVER}/users/`;

    try {

      await axios.post(url, userProfile);

      setUser(userProfile);

    } catch (error) {
      console.error(error.message);
    }
  }

  async function setUser(newUser) {
    const url = `${SERVER}/users/${newUser.username}`;

    try {

      const response = await axios.get(url);

      updateUser(response.data[0]);

    } catch (error) {
      console.error(error.message);
    }

    onHide();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>

        <Modal.Title>Sign Up - Fútbol Fans</Modal.Title>

      </Modal.Header>
      <Modal.Body>

        <ProfileForm user={user} handleSubmit={addUser} />

      </Modal.Body>
    </Modal>
  )
}

export default SignUp;
