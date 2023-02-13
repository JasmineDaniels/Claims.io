import lighthouse from '../images/lighthouse.png';
import '../App.css';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <header className="App-header">
            <br></br>
            <br></br>
            <h1>Welcome to Claims.io</h1>

            <p>The Claims.io front-end is currently in development.</p>
            <p >Feel Free to <Link to={'/about'} style={{color: "#fadd8f"}}>Explore</Link> and <Link to={'/user-signup'} style={{color: "#ffbd00"}}>Create a Free Account</Link> today to learn more about Claims.io!</p>


            {/* <a
                className="App-link"
                href="https://claimsio-production.up.railway.app/api/users/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Get Users
            </a>

            <a
                className="App-link"
                href="https://claimsio-production.up.railway.app/api/employees/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Get Employees
            </a> */}
            <img src={lighthouse} alt="logo" />
            
        </header>
    );
}

export default Home;