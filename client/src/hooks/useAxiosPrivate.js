import { axiosPrivate } from "../api/axois";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                //handle the first attempt
                if (!config.headers['Authorization']){ 
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`; 
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                console.log(`this is prevRequest`, prevRequest);
                // if token is expired && if request does not have the sent custom property
                if(error?.response?.status === 403 && !prevRequest.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    //make request again with new accessToken
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh])

    // return axiosPrivate instance with attached interceptors
    return axiosPrivate;
}

export default useAxiosPrivate;