import { useEffect, useState } from 'react';
import axios from '../../api/axois';

const AllEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [mounted, setMounted] = useState(false);

    //console.log(`this is employees`, employees);

    useEffect(() => {
        setMounted(true);
        (async () => {
            const empData = await axios.get('employees/');
            const emp = empData.data;
            
            //setEmployees(employees => [...employees, emp]);
            setEmployees(emp)
        })();

        // return() => {
        //     setMounted(false);
        // }
    }, []);

    return (
        <article>
            <h1> Get All Employees List</h1>
            {employees?.length
                ? (
                    <ul>
                        
                        {employees.map((emp, index) => {
                            return (
                            <li key={index}>
                                {emp?.firstName}
                            </li>
                        )})}
                    </ul>
                ) : (
                    <p> No employees to display.</p>

                )
            }
        </article>
    )
}
export default AllEmployees;

/* {Object.entries(employees).map(([key, value]) => (
    <div className="item" key={key}>
        {value}
    </div>
))} */