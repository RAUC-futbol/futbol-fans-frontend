import { useState } from 'react';
import axios from 'axios';




export default function Explore() {
    const [teams, setTeams] = useState("")
    const [teamID, setTeamId] = useState('');


    //const API_KEY = process.env.FB_API_KEY
    //const url = 'https://api.football-data.org/v4/teams/:${teamID}'

    async function getTeam() {

        const apiKey = process.env.FB_API_KEY; 

        const headers = {
            'X-Auth-Token': apiKey,
        };

        const API = `https://api.football-data.org/v4/teams/:${teamID}?`;
        const response = await axios.get(API, {headers});
        const teamData = response.data
        setTeams(teamData);

    }


    // Query function
    function updateQuery(event) {
        setTeamId(event.target.value);

    }


    return (
        <div>
            <input onChange={updateQuery} />
            <button onClick={getTeam}>Explore Teams!</button>
            <h1></h1>
            <h1>{teams}</h1>
        </div>
    );
}
