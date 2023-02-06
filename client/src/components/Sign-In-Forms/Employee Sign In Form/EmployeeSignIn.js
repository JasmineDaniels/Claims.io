import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
// import AuthContext from "../../../context/AuthProvider";
import useAuth from "../../../hooks/useAuth";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Form, InputGroup, Card } from 'react-bootstrap';
import axios from '../../../api/axois';


const EMP_LOGIN_URL = '/employees/login';

const EmpSignIn = () => {
    //const { setAuth } = useContext(AuthContext);
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    //const location = useLocation();
    //console.log(`this is location.state`, location.state);
    //const from = location.state?.from?.pathname || '/';
    const agent = '/employees';
    const admin = '/admin'

    const userRef = useRef();
    const errRef = useRef();


    const [email, setEmail] = useState('');
    // eslint-disable-next-line
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [password, setPassowrd] = useState('')

    const [policyNo, setPolicyNo] = useState('');
    const [_id, setId] = useState('');
    const [errMsg, setErrMsg] = useState('');

    //focus on the email input - only on page load
    useEffect(() => {
        userRef.current.focus();
    }, []);

    //errMsg useEffect
    useEffect(() => {
        setErrMsg('');
    }, [email, password, _id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!email || !policyNo || !_id) {
                setErrMsg(`One of these identifiers are required: - Email\n - Policy No\n - Account ID`)
            }

            if (!password) {
                setErrMsg(`Password is required.`)
            };

            // const response = await fetch('http://localhost:5000/api/employees/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     credentials: 'include',
            //     body: JSON.stringify({
            //         email,
            //         password,
            //         id,
            //         policyNo
            //     }),
            // });

            const response = await axios.post(EMP_LOGIN_URL,
                JSON.stringify({ email, password, policyNo, _id }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            
            const user = response.data?.result?._id;
            const accessToken = response?.data?.accessToken;
            const roles = Object.values(response?.data?.result?.role);
            setAuth({ email, user, password, policyNo, roles, accessToken });
            setEmail('')
            setPassowrd('')
            setPolicyNo('')
            setId('')
            //navigate(agent, { replace: true })
            if (roles.includes(5150)) {
                navigate(admin, { replace: true });
            } else if (roles.includes(1984)) {
                navigate(agent, { replace: true });
            }
        } catch (error) {
            console.log(error)
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg(`Incorrect Login Credentials`);
            } else if (error.response?.status === 401) {
                setErrMsg(`Unauthorized`);
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
        <section>
            <Container className='my-3'>
                <Row className='d-flex justify-content-center align-items-center'>
                    <Col md={6}>
                        <Card className='visual rounded-3'>
                            <div>
                                <h4
                                    ref={errRef}
                                    className={errMsg ? 'errfont' : 'offscreen'}
                                    aria-live="assertive">
                                    {errMsg}
                                </h4>
                            </div>
                            <Card.Body>
                                <h1 className="text-center">Sign In</h1>
                                <Form onSubmit={handleSubmit}>

                                    <InputGroup className='my-3'>
                                        <InputGroup.Text htmlFor='email'>
                                            Email:
                                        </InputGroup.Text>
                                        <Form.Control
                                            type='email'
                                            id='email'
                                            onChange={(e) => setEmail(e.target.value)}
                                            ref={userRef}
                                            placeholder='Enter Email'
                                            aria-label='Email'
                                            value={email}
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)}
                                        />
                                    </InputGroup>

                                    <InputGroup >
                                        <InputGroup.Text htmlFor='password'>
                                            Password:
                                            <span className="invalid">
                                                *
                                                {/* <FontAwesomeIcon icon={faAsterisk}/> */}
                                            </span>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type='password'
                                            id='password'
                                            onChange={(e) => setPassowrd(e.target.value)}
                                            required
                                            placeholder="Enter Password"
                                            value={password}
                                        />
                                    </InputGroup>


                                    <br />
                                    <hr />

                                    <p className='text-center' style={{ fontWeight: 'bold' }}>Or Sign In with:</p>
                                    <InputGroup className='my-3'>
                                        <InputGroup.Text htmlFor='policy_number'>
                                            Policy Number:
                                        </InputGroup.Text>
                                        <Form.Control
                                            type='text'
                                            id='policy_number'
                                            autoComplete='off'
                                            onChange={(e) => setPolicyNo(e.target.value)}
                                            aria-label='Policy Number'
                                            placeholder="Enter Policy Number"
                                        />
                                    </InputGroup>

                                    <InputGroup className='my-3'>
                                        <InputGroup.Text htmlFor='account_id'>
                                            Account ID:
                                        </InputGroup.Text>
                                        <Form.Control
                                            type='text'
                                            id='account_id'
                                            onChange={(e) => setId(e.target.value)}
                                            aria-label='Account ID'
                                            placeholder="Enter Account ID"
                                            aria-describedby='acct_id_note'
                                            value={_id}
                                        />
                                    </InputGroup>
                                    <p id='acct_id_note' className={'offscreen'}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Please enter a valid Account ID.
                                    </p>

                                    <div className='text-center'>
                                    <button
                                        className='btn btn-warning mb-3'
                                        type='submit'
                                        disabled={!password ? true : false}>
                                        Sign In
                                    </button>
                                    </div>
                                    
                                    <div className='text-center'>
                                    <p style={{ fontWeight: 'bold' }}>
                                        Create an Account? <br />
                                        {/* react router link */}
                                        <Link to={'/employee-signup'}> Sign Up</Link>
                                    </p>
                                    </div>
                                    
                                </Form>
                            </Card.Body>

                        </Card>
                    </Col>
                </Row>


            </Container>
        </section>
        
        </>
    )
}

export default EmpSignIn;