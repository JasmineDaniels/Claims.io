import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    const isAuthorized = role => {
        return allowedRoles.includes(role)
    }

    return (
        //auth?.roles?.find((role) => allowedRoles?.includes(role))
        auth.roles?.find(isAuthorized)
            ? <Outlet/>
            : auth?.user // if employee is not authorized
                ? <Navigate to={'/unauthorized'} state={{from: location}} replace/>
                : <Navigate to={'/employee-login'} state={{from: location}} replace/>
    );
}

export default RequireAuth;