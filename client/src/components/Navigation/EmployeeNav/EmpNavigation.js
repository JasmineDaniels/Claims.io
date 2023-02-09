import { Link } from 'react-router-dom';
import './emp-nav.css'
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { default as axios } from '../../../api/axois';
const home = '/'
const EmpNavigation = () => {
    const {  auth, setAuth } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout =  async (e) => {
        e.preventDefault();
        const response = await axios.get('employees/logout', {
            withCredentials: true,        
        });
        console.log(response)
        setAuth({ email: '', user: null, policyNo: '', roles: '', accessToken: '' });
        console.log(auth);
        navigate(home, { replace: true });
    };
    
    return (
        <div className='row '>
            <div className='col pt-2 emp-nav-border'>
                <nav className="emp-nav float-end">
                    <h6 className='text-center'> Employee Portal</h6>
                    <ul>
                        {auth.user ? (
                            //<Link onClick={<AuthLogout/>}>Logout</Link>
                            <Link to={'/logout'} className='emp-nav-link' onClick={handleLogout}>Logout</Link>
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

