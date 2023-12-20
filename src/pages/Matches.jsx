// react
import { useEffect, useState } from 'react';
// dependencies
import axios from 'axios';
// bootstrap
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function Matches() {

  const teamId = 61; //temp, replace with state from parent

  const [results, setResults] = useState({});
  const [matches, setMatches] = useState([]);
  const [allMatches, setAllMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [futureMatches, setFutureMatches] = useState([]);
  const [activeMatches, setActiveMatches] = useState([]);

  // useEffect(() => {
  //   getMatches();
  // });

  async function getMatches() {
    const url = `http://localhost:3001/matches/team/${teamId}`;

    try {

      const response = await axios.get(url);
      const resultsResponse = response.data.results;
      const matchesResponse = response.data.matches;
      setResults(resultsResponse);
      setMatches(matchesResponse);
      sortMatchesData();

    } catch (error) {
      console.error(error.message);
    }
  }

  function sortMatchesData() {
    if (matches.active.length) {
      setPastMatches(matches.past);
      setFutureMatches(matches.future);
      setActiveMatches(matches.active);
      setAllMatches([...matches.active, ...matches.past, ...matches.future]);
    } else {
      setPastMatches(matches.past);
      setFutureMatches(matches.future);
      setAllMatches([...matches.past, ...matches.future]);
    }
  }

  return (
    <Stack>

      <MatchesForm getMatches={getMatches}/>

      <Table size='sm'>
        <thead>
          <tr>
            <th>Status</th>
            <th>Date</th>
            <th>Matchday</th>
            <th>Home</th>
            <th>Score</th>
            <th>Away</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </Table>

    </Stack>
  )
}

function MatchesForm({ getMatches }) {

  const [status, setStatus] = useState();
  const [season, setSeason] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();

  return (
    <Form>
      <Row>
        <Col>
          <InputGroup size='sm'>
            <InputGroup.Text>Status</InputGroup.Text>
            <Form.Select>
              <option value="all">All</option>
              <option value="past">Finished</option>
              <option value="future">Scheduled</option>
              <option value="active">In Play</option>
            </Form.Select>
            <InputGroup.Checkbox></InputGroup.Checkbox>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup size='sm'>
            <InputGroup.Text>Season</InputGroup.Text>
            <Form.Select>
              <option value="all">2023</option>
              <option value="past">2022</option>
              <option value="future">2021</option>
              <option value="active">2020</option>
            </Form.Select>
            <InputGroup.Checkbox></InputGroup.Checkbox>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup size='sm'>
            <InputGroup.Text>From</InputGroup.Text>
            <Form.Control type='date'></Form.Control>
            <InputGroup.Text>To</InputGroup.Text>
            <Form.Control type='date'></Form.Control>
            <InputGroup.Checkbox></InputGroup.Checkbox>
          </InputGroup>
        </Col>
        <Col>
        <Button size='sm' onClick={getMatches}>Get Matches</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Matches;