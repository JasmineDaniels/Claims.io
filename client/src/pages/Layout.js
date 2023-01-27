import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import EmpNavigation from '../components/Navigation/EmployeeNav/EmpNavigation';
import MainNavigation from '../components/Navigation/MainNav/MainNavigation';
const Layout = () => {

    return(
        <main className="App">
            {/* <TempHeader/> */}
            {/* <EmpNavigation/> */}
            <Header/>
            <MainNavigation/>
            <Outlet/>
            {/* Footer */}
        </main>
    )
}

export default Layout;