import leaguesDictionary from "../../config/leagues";
const LeagueStandings = ({
  selectedLeague,
  leagueStandings,
}) => {
  const leagueInfo = leaguesDictionary.find((league) => league[selectedLeague]);

  const leagueName = leagueInfo
    ? leagueInfo[selectedLeague].name
    : selectedLeague;

  const leagueImageUrl = leagueInfo ? leagueInfo[selectedLeague].emblem : '';

  const standings = leagueStandings
    .filter((item) => item.leagueCode === selectedLeague)
    .map((item) => item.team);

  if (!standings || standings.length === 0) {
    return <div>No standings available for the selected league.</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2>{leagueName} Standings</h2>
        <img src={leagueImageUrl} alt={`${leagueName} emblem`} style={{ maxHeight: '10rem', marginLeft: '10px' }} />
      </div>
      <table
        style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={tableHeaderStyle}>Position</th>
            <th style={tableHeaderStyle}>Team</th>
            <th style={tableHeaderStyle}>Played</th>
            <th style={tableHeaderStyle}>Won</th>
            <th style={tableHeaderStyle}>Draw</th>
            <th style={tableHeaderStyle}>Lost</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr key={team._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tableCellStyle}>{index + 1}</td>
              <td style={tableCellStyle}>{team.name}</td>
              <td style={tableCellStyle}>{team.playedGames}</td>
              <td style={tableCellStyle}>{team.won}</td>
              <td style={tableCellStyle}>{team.draw}</td>
              <td style={tableCellStyle}>{team.lost}</td>
              {/* Add other relevant columns */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '12px',
  textAlign: 'left',
};

export default LeagueStandings;
