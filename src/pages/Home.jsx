import SiteDescription from "../components/SiteDescription";
import HeroImage from "../components/HeroImage";
import Button from 'react-bootstrap/Button';

export default function Home(props) {
    return (
        <div>
            <h1 className="title">Home</h1>
            <div className="hero-content">
                <HeroImage />
                <div className="text-container" style={{ textAlign: 'right', paddingRight: '20px' }}>
                    <h4 className="title">Customize Your Experience</h4>
                    <Button onClick={props.toggleShowSignUp} variant="info">Sign Up Now!</Button>
                </div>
            </div>
            <SiteDescription />
        </div>
    );
}
