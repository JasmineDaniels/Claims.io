import { default as axios} from "../api/axois";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        //send HTTP cookie with request
        const response = await axios.get('employees/refresh', {
            withCredentials: true
        });
        setAuth(prevState => {
            // console.log(`this is prev state`, prevState);
            
            //overwrite the old accessToken with a new accessToken
            return { ...prevState, accessToken: response.data.accessToken }
        });
        /* the first attempt will fail when expired, 
        send over the new accessToken on second attempt*/
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;