function Filters({
  selectedLeague,
  selectedTeam,
  handleLeagueChange,
  handleTeamChange,
}) {
  console.log('Selected League:', selectedLeague);
  console.log('Selected Team:', selectedTeam);
  return (
    <>
      <select value={selectedLeague} onChange={handleLeagueChange}>
        <option value='PL'>Premier League</option>
        <option value='EC'>European Championship</option>
      </select>
      <select value={selectedTeam} onChange={handleTeamChange}>
        <option value='Chelsea FC'>Chelsea FC</option>
        <option value='Arsenal FC'>Arsenal FC</option>
      </select>
    </>
  );
}

export default Filters;
