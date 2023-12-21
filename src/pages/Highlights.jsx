import { useState, useEffect } from 'react';
import axios from 'axios';
import HighlightVideo from '../components/HighlightVideo';
import { Row, Col, Container } from 'react-bootstrap';

const HighlightsComponent = () => {
  const [highlights, setHighlights] = useState([]);
  const SERVER = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch highlights data from your API endpoint
    const fetchHighlights = async () => {
      let apiLeagueCode = 4329;
      let dbURL = `${SERVER}/highlights/${apiLeagueCode}`;
      console.log({dbURL});
      try {
        const response = await axios.get(dbURL);
        setHighlights(response.data);
      } catch (error) {
        console.error('Error fetching highlights:', error.message);
      }
    };

    fetchHighlights();
  }, []);

  return (
    <Container>
     <h1>Video Highlights</h1>
      <Row>
        {highlights.map((highlight) => (
          <Col key={highlight.idEvent} xs={12} md={6} lg={4}>
            <HighlightVideo highlight={highlight} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HighlightsComponent;
