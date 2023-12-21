import { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../Explore.css';


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


    const team = teams[0];
    const competition = team?.runningCompetitions[0]
    return (
        <div className='returnDiv'>
            <input style={{marginTop: '10px', marginBottom: '15px'}} onChange={updateQuery} />
            <button onClick={getTeam}>Explore Team!</button>
            {/* <p>{JSON.stringify(team)}</p> */}
            <Card style={{ width: '36rem'}}>
                <Card.Header>{team?.name}</Card.Header>
                <Card.Img variant="top" src={team?.crest} />
                <ListGroup variant="flush">
                    <ListGroup.Item className='listGroup'>Year Founded: {team?.founded}</ListGroup.Item>
                    <ListGroup.Item className='listGroup'>Address: {team?.address}</ListGroup.Item>
                    <ListGroup.Item className='listGroup'>TLA: {team?.tla}</ListGroup.Item>
                    <ListGroup.Item className='listGroup'>Competition Name: {competition?.name}</ListGroup.Item>
                    <ListGroup.Item className='listGroup'>Competition Type: {competition?.type}</ListGroup.Item>
                    <ListGroup.Item className='listGroup'>Coach Name: {team?.coach.name}</ListGroup.Item>
                    {/* <ListGroup.Item>Coach Name: {team?.coach.name}</ListGroup.Item>
                    <ListGroup.Item>Address: {team?.address}</ListGroup.Item> */}
                    <ListGroup.Item className='listGroup'>
                        <h5>List of Players</h5>
                        <ul>
                            {team?.squad.map((person, index) => (
                                <li key={index}>
                                    <p>Name: {person.name}; Position: {person.position}; Nationality: {person.nationality} </p>
                                </li>
                            ))}
                        </ul>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}