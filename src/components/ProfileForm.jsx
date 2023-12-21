// react
import { useState } from 'react';
// bootstrap
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// league and team data
import leaguesDictionary from '../../config/leagues';
import teamDictionary from '../../config/teamDictionary';

function ProfileForm({ user, handleSubmit }) {

  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [favLeague, setFavLeague] = useState(user.favLeague);
  const [favTeam, setFavTeam] = useState(user.favTeam);

  const flattenedLeagues = leaguesDictionary.flatMap(Object.values);

  function handleChange(event) {
    const formField = event.target.id;

    if (formField === 'username') {
      setUsername(event.target.value);
    } else if (formField === 'name') {
      setName(event.target.value);
    } else if (formField === 'favLeague') {
      setFavLeague(event.target.value);
    } else if (formField === 'favTeam') {
      setFavTeam(event.target.value);
    }
  }

  function submitUserProfile(event) {
    event.preventDefault();

    const userProfile = {
      username: username,
      name: name,
      favLeague: favLeague,
      favTeam: favTeam
    }

    handleSubmit(userProfile);
  }

  return (
    <Form onSubmit={submitUserProfile}>
      <Stack gap={3}>
        <FloatingLabel label='username'>
          <Form.Control id='username' onChange={handleChange} placeholder='username' value={username}></Form.Control>
        </FloatingLabel>
        <FloatingLabel label='name'>
          <Form.Control id='name' onChange={handleChange} placeholder='name' value={name}></Form.Control>
        </FloatingLabel>
        <InputGroup size='lg'>
          <InputGroup.Text>Favorite League</InputGroup.Text>
          <Form.Select id='favLeague' onChange={handleChange} value={favLeague}>
            {flattenedLeagues.map((league) =>
              <option key={league.compId} value={league.compId}>{league.name}</option>
            )}
          </Form.Select>
        </InputGroup>
        <InputGroup size='lg'>
          <InputGroup.Text>Favorite Team</InputGroup.Text>
          <Form.Select id='favTeam' onChange={handleChange} value={favTeam}>
            {teamDictionary
              .filter((team) => team.runningCompetitions
              .some((competition) => competition.id === parseInt(favLeague)))
              .map((team) =>
                <option key={team.id} value={team.id}>{team.name}</option>
              )}
          </Form.Select>
        </InputGroup>
        <Button type='submit' variant='success'>Submit</Button>
      </Stack>
    </Form>
  )
}

export default ProfileForm;
