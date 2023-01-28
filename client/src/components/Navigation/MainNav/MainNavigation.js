import { Link } from 'react-router-dom';
import { Row, Navbar, Nav, Col } from 'react-bootstrap';
import lighthouse120px from '../../../images/lighthouse-120px.png';
import './main-nav.css';
export default function MainNavigation() {

    return (
        <>
            <Row>
                <nav className="nav navbar navbar-expand-md">
                    <div className='col'>
                        <div className='brand-align'>
                            <div >
                                <Link className="navbar-brand" to={'/'}>
                                    <img src={lighthouse120px} alt="" className='light-margins'></img>
                                </Link>
                            </div>

                            <div >
                                <Link className="navbar-brand" to={'/'}>
                                    <span to={'/'} className='site-title site-title-LH pt-4'>Claims.io </span> 
                                    <span className='site-title-LH'> by LightHouse</span>
                                </Link>
                            </div>

                        </div>

                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className='col pb-5'>
                            <div className='main-navlinks rounded-pill mx-auto fix-center '>
                                <ul className='justify-content-center'>
                                    <Link to={'/about'} className="nav-link mx-2">About</Link>
                                    <Link to={'/pricing'} className="nav-link ">Pricing</Link>
                                    <Link to={'/userLogin'} className="nav-link ">Login</Link>
                                    <Link to={'/userSignUp'} className="nav-link mx-2">Sign Up</Link>
                                </ul>
                            </div>
                        </div>

                        <div className='col-md-'>
                            <div className='row'>
                                <form className="form-inline my-2 my-lg-0 spaced-out ">
                                    <div className='col-md-7 '>
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                                    </div>
                                    <div className='col-md-4 mx-2'>
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