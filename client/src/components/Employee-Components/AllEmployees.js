import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
//import { useNavigate, useLocation } from 'react-router-dom';

const AllEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    // const navigate = useNavigate();
    // const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        (async () => {
            try {
                const empData = await axiosPrivate.get('employees/', {
                    signal: controller.signal
                });
                const emp = empData.data;
                //setEmployees(employees => [...employees, emp]);
                console.log(`mounted`);
                isMounted && setEmployees(emp);
            } catch (error) {
                console.error(error);
                //navigate('/employee-login', { state: { from: location }, replace: true });
            }
        })();

        return () => {
            console.log(`unmounted`)
            isMounted = false;
            //cancel any pending requests
            controller.abort();
        }
    
    // react-hooks/exhaustive-deps 
    // eslint-disable-next-line
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
                            )
                        })}
                    </ul>
                ) : (
                    <p> No employees to display.</p>

                )
            }
        </article>
    )
}
export default AllEmployees;