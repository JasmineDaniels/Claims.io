import { Link } from 'react-router-dom';
import './emp-nav.css'
import useAuth from '../../../hooks/useAuth';
const EmpNavigation = () => {
    const { auth } = useAuth();
    return (
        <div className='row emp-nav-border'>
            <div className='col pt-2'>
                <nav className="emp-nav float-end">
                    <h6 className='text-center'> Employee Portal</h6>
                    <ul>
                        {auth.user ? (
                            //<Link onClick={<AuthLogout/>}>Logout</Link>
                            <Link to={'/logout'} className='emp-nav-link'>Logout</Link>
                        ) : (
                            <>
                                <Link to={'/employee-login'} className='emp-nav-link'>Login</Link>
                                <Link to={'/employee-signUp'} className='emp-nav-link'>Sign Up</Link>
                            </>
                        )}

                    </ul>
                </nav>
            </div>
            <hr/>
        </div>
    )
}

// function CustomLink({ to, children, ...props }) { //props = classnames, functions etc
//     const path = window.location.pathname; //to determine which is active
//     <li className={path === to ? "emp-active" : ""}>
//         <Link to={to} {...props}>
//             {children}
//         </Link>
//     </li>
// }

export default EmpNavigation;

