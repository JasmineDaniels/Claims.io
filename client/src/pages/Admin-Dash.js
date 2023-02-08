//import { Routes, Route } from "react-router-dom"
//import EmployeeDashNav from '../components/Employee-Components/EmployeeDash-Navigation';
import AllEmployees from "../components/Employee-Components/AllEmployees"
export default function AdminDash(){
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <br/>
            {/* <EmployeeDashNav/> */}
            {/* <Routes>
                <Route path="get-employees" element={<AllEmployees />}/>
                <Route path="get-claims" element={<AllEmployees />}/>
                <Route path="get-clients" element={<AllEmployees />}/>
            </Routes> */}
            <AllEmployees/>
        </div>
    
    )
}