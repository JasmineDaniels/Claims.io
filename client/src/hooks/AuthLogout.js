import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const home = '/'
//const { auth, setAuth } = useAuth();
// setAuth({ accessToken: ''})

// if (auth.roles?.includes(1984){
    // const response = await axios.get('employees/logout', {})
//} else {
    // const response = await axios.get('users/logout', {})
//}

//navigate('/', replace)
const AuthLogout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(home, { replace: true });
    })

}

export default AuthLogout;
