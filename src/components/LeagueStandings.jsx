const LeagueStandings = ({ selectedLeague, standings }) => {
  const leagueStandings = standings[selectedLeague];

  if (!leagueStandings) {
    return <div>No standings available for the selected league.</div>;
  }

  return (
    <div>
      <h2>{selectedLeague} Standings</h2>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Played</th>
            <th>Won</th>
            <th>Draw</th>
            <th>Lost</th>
          </tr>
        </thead>
        <tbody>
          {leagueStandings.map((team, index) => (
            <tr key={team.team._id}>
              <td>{index + 1}</td>
              <td>{team.team.name}</td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.draw}</td>
              <td>{team.lost}</td>
              {/* Add other relevant columns */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueStandings;
