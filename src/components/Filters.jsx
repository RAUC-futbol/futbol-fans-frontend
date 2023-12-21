function Filters({

}) {
  // console.log('Selected League:', selectedLeague);
  // console.log('Selected Team:', selectedTeam);

    function handleLeagueChange(event) {
    setSelectedLeague(event.target.value);
  }

  function handleTeamChange(event) {
    setSelectedTeam(event.target.value);
  }

  return (
    <>
      <select value={selectedLeague} onChange={handleLeagueChange}>
        <option value='PL'>Premier League</option>
        <option value='CL'>UEFA Champions League</option>
        <option value='FL1'>Ligue 1</option>
        <option value='BL1'>Bundesliga</option>
        <option value='SA'>Serie A</option>
        <option value='DED'>Eredivisie</option>
        <option value='PPL'>Primera Division</option>
        <option value='WC'>FIFA World Cup</option>
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
