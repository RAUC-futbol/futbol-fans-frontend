import futbol1 from "/img/futbol1.jpg";
import futbol4 from "/img/futbol4.jpeg";
import futbol3 from "/img/futbol3.jpg";
import Carousel from "react-bootstrap/Carousel";

export default function HeroImage() {
    return (
        <Carousel
            interval={5000}
            style={{ maxHeight: '400px', overflow: 'hidden' }}
        >
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={futbol1}
                    alt="Lionel Messi"
                    style={{ objectFit: 'cover', maxHeight: '400px', margin: 'auto' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={futbol4}
                    alt="Alexis Morgan"
                    style={{ objectFit: 'cover', maxHeight: '400px', margin: 'auto' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={futbol3}
                    alt="Kylian Mbappe"
                    style={{ objectFit: 'cover', maxHeight: '400px', margin: 'auto' }}
                />
            </Carousel.Item>
        </Carousel>
    );
}
