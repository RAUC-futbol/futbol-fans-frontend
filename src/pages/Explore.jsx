import { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const SERVER = import.meta.env.VITE_API_URL;



export default function Explore() {
    const [teams, setTeams] = useState("")
    const [teamId, setTeamId] = useState('');


    //const url = 'https://api.football-data.org/v4/teams/:${teamID}'

    async function getTeam() {
        console.log(teamId);
        let dbURL = `${SERVER}/teams/${teamId}`;
        console.log({ dbURL })
        try {
            const response = await axios.get(dbURL);
            const teamData = response.data
            setTeams(teamData);
            console.log(teamData);
        } catch (error) {
            console.error(error);
        }

    }

    function updateQuery(event) {
        setTeamId(event.target.value);
    }

    const stringData = JSON.stringify(teams)
    return (
        <div>
            <input onChange={updateQuery} />
            <button onClick={getTeam}>Explore Teams!</button>
            <p>{JSON.stringify(teams)}</p>
            <p>{stringData[0].name}</p>
            <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card>
        </div>
    );
}