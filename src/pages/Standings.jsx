import TeamCard from '../components/TeamCard'

export default function Standings({ standings }) {
  return (
    <div>
      <h1>Standings</h1>
      {standings.map((teamData) => (
        <TeamCard key={teamData.team._id} team={teamData.team} />
      ))}
    </div>
  );
}
