import lighthouse from '../images/lighthouse.png';
import '../App.css';

const Home = () => {
    return (
        <header className="App-header">
            <br></br>
            <br></br>
            Welcome to Claims.io

            <p>Claims front-end is currently in development</p>
            <span style={{color: "#ffbd00"}}>Feel free to test the RESTful API</span>

            <p>
                Use testing routes below ⬇️.
            </p>
            <a
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
            </a>
            <img src={lighthouse} alt="logo" />
            
        </header>
    );
}

export default Home;