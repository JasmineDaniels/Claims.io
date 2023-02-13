import ComingSoonTemplate from "../components/ComingSoon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import '../css/about.css';
import happycustomer from '../images/happy-about.jpg';
export default function About() {
    return (
        <>
            <h1 className="text-center hide">About Page</h1>
            {/* <ComingSoonTemplate /> */}
            <div className="about-bkgrd main">

                <h1 className="pt-5">Welcome to Claims.io</h1>

                <p style={{ color: "#ffbd00" }}>The Claims.io front end is currently in development.</p>

                <p> Claims.io is an entrerprise level full service platform designed for immediate assistance to insured casualties.
                    <br />Please check back frequently for more updates!</p>

                <p>Claims.io was created by <a className="App-link"
                    href="https://github.com/JasmineDaniels"
                    target="_blank"
                    rel="noopener noreferrer">Jasmine Daniels</a> as a website template <br />for prospecting businesses and entrepreneurs big and small.</p>

                <div className="container">
                    <div className="row features pt-3 pb-3 mx-auto">

                        <div className="col ">
                            <img src={happycustomer} alt='happy customer' className="happy-happy" />
                        </div>

                        <div className="col development">
                            <ul >
                                <li style={{ color: '#ffbd00' }} className='mb-3'>Features in Development:</li>
                                <li> <FontAwesomeIcon icon={faCheck} className='mx-1 valid' />Secure Data Authentication</li>
                                <li>Enroll & Manage New Clients</li>
                                <li>Retain Monthly Policy Sales</li>
                                <li>Onboard & Manage Employees</li>
                                <li><FontAwesomeIcon icon={faCheck} className='mx-1 valid' />Role-based Authorization</li>
                                <li>Manage Insurance Claims</li>

                            </ul>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}