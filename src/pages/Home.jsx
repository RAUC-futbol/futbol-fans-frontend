import SiteDescription from "../components/SiteDescription";
import HeroImage from "../components/HeroImage";
import Button from 'react-bootstrap/Button';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div className="hero-content">
                <HeroImage />
                <div className="text-container" style={{ textAlign: 'right', paddingRight: '20px' }}>
                    <h4>Customize Your Experience</h4>
                    <Button variant="info">Sign Up Now!</Button>
                </div>
            </div>
            <SiteDescription />
        </div>
    );
}
