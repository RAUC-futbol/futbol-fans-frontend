import TeamCard from '../components/TeamCard';
import LeagueStandings from '../components/LeagueStandings';

export default function Standings({ teamStandings, leagueStandings, selectedLeague }) {
  return (
    <div>
      <h1>Standings</h1>
      {teamStandings.map((teamData) => (
        <TeamCard key={teamData.team._id} team={teamData.team} />
      ))}
       <LeagueStandings selectedLeague={selectedLeague}
        leagueStandings={leagueStandings} />
    </div>
  );
}
