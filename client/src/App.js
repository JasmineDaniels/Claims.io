// import Register from "./components/Register Form/Register";
// import SignIn from "./components/Sign-In-Form/SignIn";
import TempHeader from "./components/temp-header";
import { Routes, Route } from 'react-router-dom';
//import Layout from "./pages/Layout";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import MainNavigation from "./components/Navigation/MainNav/MainNavigation";
import EmpNavigation from "./components/Navigation/EmployeeNav/EmpNavigation";
import EmpRegister from "./components/Register Forms/Employee Register Form/EmpRegister";
import Header from "./components/Header";
import EmpSignIn from "./components/Sign-In Forms/Employee Sign In Form/EmployeeSignIn";

function App() {
  return (
    <>
    <EmpNavigation/>
    <Header/>
    <MainNavigation/>
    <Routes>
      <Route path="/" element={<TempHeader/>}/>
      <Route path="employeeLogin" element={<EmpSignIn />} />
      <Route path="employeeSignUp" element={<EmpRegister />} />
      
      <Route path="about" element={<About />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="userLogin" element={<UserLogin />} />
      <Route path="userSignUp" element={<UserSignUp />} />
    </Routes>
    
    {/* Footer */}
    </>
  );
}

export default App;
