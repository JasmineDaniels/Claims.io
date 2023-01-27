import { Link } from 'react-router-dom';
import './main-nav.css';
export default function MainNavigation() {

    return (
        <nav className="nav">
            <Link to={'/'} className='site-title'>Claims.io</Link>

            <ul>
                <Link to={'/about'}>About</Link>
                <Link to={'/pricing'}>Pricing</Link>
                <Link to={'/userLogin'}>Login</Link>
                <Link to={'/userSignUp'}>Sign Up</Link>
            </ul>
        </nav>
    )
}

// function CustomLink({ to, children, ...props }) { //props = classnames, functions etc
//     const path = window.location.pathname; //to determine which is active
//     <li className={path === to ? "active" : ""}>
//         <Link to={to} {...props}>
//             {children}
//         </Link>
//     </li>
// }