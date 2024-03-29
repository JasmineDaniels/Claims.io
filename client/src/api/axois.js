import axios from 'axios';
//const BASE_URL = 'http://localhost:5000/api/'
const BASE_URL = 'https://claimsio-production.up.railway.app/api/'

export default axios.create({
    baseURL: BASE_URL
});

/* Attach jwt refresh interceptors */ 
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type' : 'application/json'},
    withCredentials: true
});