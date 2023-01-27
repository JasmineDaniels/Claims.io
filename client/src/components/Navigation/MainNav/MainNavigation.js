import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import lighthouse120px from '../../../images/lighthouse-120px.png';
import './main-nav.css';
export default function MainNavigation() {

    return (
        <>
            <Row>
                <nav className="nav navbar navbar-expand-lg">
                    <div>
                        <a className="navbar-brand" href="#">
                            <img src={lighthouse120px} alt=""></img>
                        </a>
                        <Link to={'/'} className='navbar-brand site-title'>Claims.io</Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className='col-md-8'>
                            <ul className='justify-content-center'>
                                <Link to={'/about'} className="nav-link">About</Link>
                                <Link to={'/pricing'} className="nav-link">Pricing</Link>
                                <Link to={'/userLogin'} className="nav-link">Login</Link>
                                <Link to={'/userSignUp'} className="nav-link">Sign Up</Link>
                            </ul>
                        </div>

                        <div className='col'>
                            <div className='row'>
                                <form className="form-inline my-2 my-lg-0 spaced-out">
                                    <div className='col-md-7 mx-2'>
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                                    </div>
                                    <div className='col-md-4'>
                                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </nav>
            </Row>

            {/* <nav className="navbar navbar-expand-lg bg-dark">
<a className="navbar-brand" href="#">Claims.io</a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav mr-auto">
    <li className="nav-item active">
      <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">Link</a>
    </li>
    
    <li className="nav-item">
      <a className="nav-link disabled" href="#">Disabled</a>
    </li>
  </ul>
  <form className="form-inline my-2 my-lg-0">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
</div>
</nav> */}
        </>
    )
}

// function CustomLink({ to, children, ...props }) { //props = classNamenames, functions etc
//     const path = window.location.pathname; //to determine which is active
//     <li className={path === to ? "active" : ""}>
//         <Link to={to} {...props}>
//             {children}
//         </Link>
//     </li>
// }