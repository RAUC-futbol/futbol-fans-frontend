import TeamCard from '../components/TeamCard';
import LeagueStandings from '../components/LeagueStandings';

export default function Standings({ standings, selectedLeague }) {
  return (
    <div>
      <h1>Standings</h1>
      {standings.map((teamData) => (
        <TeamCard key={teamData.team._id} team={teamData.team} />
      ))}
       <LeagueStandings selectedLeague={selectedLeague} standings={standings} />
    </div>
  );
}
