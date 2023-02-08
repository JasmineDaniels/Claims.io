import { Link } from "react-router-dom";
const EmployeeDashNav = () => {
    return(
        <div>
            <Link to={'/get-employees'}></Link>
            <Link to={'/get-claims'}></Link>
            <Link to={'/get-clients'}></Link>
        </div>
    )
}

export default EmployeeDashNav;