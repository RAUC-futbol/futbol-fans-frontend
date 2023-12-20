// bootstrap
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

function Matches() {
  return (
    <Stack>

      <MatchesForm />

      <Table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Date</th>
            <th>Matchday</th>
            <th>Home Team</th>
            <th>Score</th>
            <th>Away Team</th>
            <th>Score</th>
          </tr>
        </thead>
      </Table>

    </Stack>
  )
}

function MatchesForm() {
  return (
    <Form>
      <Row>
        <Col>
          <InputGroup>
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
          <InputGroup>
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
          <InputGroup>
            <InputGroup.Text>From</InputGroup.Text>
            <Form.Control type='date'></Form.Control>
            <InputGroup.Text>To</InputGroup.Text>
            <Form.Control type='date'></Form.Control>
            <InputGroup.Checkbox></InputGroup.Checkbox>
          </InputGroup>
        </Col>
      </Row>
    </Form>
  )
}

export default Matches;