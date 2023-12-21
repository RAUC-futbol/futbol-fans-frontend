// react
import { useState } from 'react';
// dependencies
import axios from 'axios';
// bootstrap
import Container from 'react-bootstrap/Container';
// server API
const SERVER = import.meta.env.VITE_API_URL;
// components
import ProfileForm from '../components/ProfileForm';

function Profile({ user, updateUser }) {

  const [currentUser, setCurrentUser] = useState(user);

  async function updateUserProfile(userProfile) {
    const url = `${SERVER}/users/${user._id}`;

    try {

      const response = await axios.put(url, userProfile);
      const updatedUser = response.data;

      setCurrentUser(updatedUser);
      updateUser(updatedUser);

    } catch (error) {
      console.error(error.message);
    }

  }

  return (
    <Container>

      <h2>Profile</h2>

      <ProfileForm user={currentUser} handleSubmit={updateUserProfile} />

    </Container>
  );
}

export default Profile;
