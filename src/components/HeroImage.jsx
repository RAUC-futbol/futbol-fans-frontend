import futbol5 from "/img/futbol5.png";
import futbol4 from "/img/futbol4.jpeg";
import futbol3 from "/img/futbol3.jpg";
import Carousel from "react-bootstrap/Carousel";

export default function HeroImage() {
    return (
        <Carousel
            interval={5000} slide={false}
            style={{ height: '400px', maxWidth: '800px', overflow: 'hidden' }}
        >
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={futbol5}
                    alt="Lionel Messi"
                    style={{ objectFit: 'cover', height: '400px', width: 'auto', margin: 'auto' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={futbol4}
                    alt="Alexis Morgan"
                    style={{ objectFit: 'cover', height: '400px', width: 'auto', margin: 'auto' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={futbol3}
                    alt="Kylian Mbappe"
                    style={{ objectFit: 'cover', height: '400px', width: 'auto', margin: 'auto' }}
                />
            </Carousel.Item>
        </Carousel>
    );
}
