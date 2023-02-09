import Home from "./pages/HomePage";
import { Routes, Route } from 'react-router-dom';
//import Layout from "./pages/Layout";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import MainNavigation from "./components/Navigation/MainNav/MainNavigation";
import EmpNavigation from "./components/Navigation/EmployeeNav/EmpNavigation";
import EmpRegister from "./components/Register-Forms/Employee Register Form/EmpRegister";
import Header from "./components/Header";
import EmpSignIn from "./components/Sign-In-Forms/Employee Sign In Form/EmployeeSignIn";
import EmployeeDash from "./pages/Employee-Dash";
import UserDash from "./pages/User-Dash";
import AdminDash from "./pages/Admin-Dash";
import Route404 from "./pages/Missing";
import Route401 from "./pages/Unathorized";
import RequireAuth from "./components/Sign-In-Forms/Employee Sign In Form/RequireAuth";
import AuthLogout from "./hooks/AuthLogout";

function App() {
  return (
    <div className="content">
    <EmpNavigation/>
    <Header/>
    <MainNavigation/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="employee-login" element={<EmpSignIn />} />
      <Route path="employee-signUp" element={<EmpRegister />} />
      
      <Route path="about" element={<About />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="user-login" element={<UserLogin />} />
      <Route path="user-signUp" element={<UserSignUp />} />


      <Route path="/users" element={<UserDash/>}/>

      <Route element={<RequireAuth allowedRoles={[1984, 5150]}/>}>
        <Route path="/employees" element={<EmployeeDash/>}/>
      </Route>

      <Route element={<RequireAuth allowedRoles={[5150]}/>}>
        <Route path="/admin" element={<AdminDash/>}/>
      </Route>

      <Route path="/logout" element={<AuthLogout/>}/>
      <Route path="/unauthorized" element={<Route401/>}/>
      <Route path="*" element={<Route404/>}/>

    </Routes>
    
    {/* Footer */}
    </div>
  );
}

export default App;
