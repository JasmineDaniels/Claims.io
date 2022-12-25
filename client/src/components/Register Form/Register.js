import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Form, InputGroup, Card } from 'react-bootstrap';
import axios from '../../api/axois';
import './register.css';

const EMAIL_RGX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PW_RGX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@?#$%])[a-zA-Z0-9!?]{8,24}/;
const EMP_REGISTER_URL = '/employees/'
//const EMP_REGISTER_URL = '/employees/register'
const REGISTER_URL = '/register'

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [lastNameFocus, setLastNameFocus] = useState(false);


    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [matchEmail, setMatchEmail] = useState('');
    const [validEmailMatch, setValidEmailMatch] = useState(false);
    const [matchEmailFocus, setMatchEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validPwdMatch, setValidPwdMatch] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = EMAIL_RGX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
        const match = email === matchEmail;
        setValidEmailMatch(match)
    }, [email, matchEmail])

    useEffect(() => {
        const result = PW_RGX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidPwdMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchEmail, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if submit button is hacked with JS
        const v1 = EMAIL_RGX.test(email);
        const v2 = PW_RGX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return;
        }

        if (!firstName || !lastName) {
            setErrMsg('First Name, Last Name, Email, & Password are required')
        }

        try {
            const response = await axios.post(EMP_REGISTER_URL,
                JSON.stringify({ firstName, lastName, email, password: pwd }),
                {
                    headers: { 
                        'Content-Type': 'application/json', 
                    },
                    withCredentials: true,
                    //body: JSON.stringify({ firstName, lastName, email, password: pwd }),
                    //"Access-Control-Allow-Credentials": true
                }
            );

            // const response = await fetch('http://localhost:5000/api/employees/', {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'},
            //     credentials: 'include',
            //     body: JSON.stringify({ 
            //         firstName, 
            //         lastName, 
            //         email, 
            //         password: pwd }),
            //     }
            // );
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true)
            // clear input fields
        } catch (error) {
            console.log(error)
            if (!error?.response){
                setErrMsg('No Server Response');
            } else if (errMsg.response?.status === 409){
                setErrMsg('This Email already exists')
                // add sign in button
            } else if (error.response?.status === 409){
                setErrMsg('This Email already exists, Please sign In.')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }

    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href='#'> Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <Container>
                        <Row className='d-flex justify-content-center align-items-center'>
                            <Col md={8} >
                                <Card className='rounded-3'>
                                    <p
                                        ref={errRef}
                                        className={errMsg ? 'errmsg' : 'offscreen'}
                                        aria-live="assertive">
                                        {errMsg}
                                    </p>
                                    <Card.Body>
                                        <h1>Register</h1>
                                        <Form onSubmit={handleSubmit}>

                                            <Form.Group className='mb-3'>
                                                <Form.Label htmlFor='firstName'>
                                                    First Name:
                                                </Form.Label>
                                                <Form.Control
                                                    type='text'
                                                    id='firstName'
                                                    ref={userRef}
                                                    autoComplete='off'
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    required
                                                    aria-invalid={firstName ? 'false' : 'true'}
                                                    aria-describedby='uidnote'
                                                    onFocus={() => setFirstNameFocus(true)}
                                                    onBlur={() => setFirstNameFocus(false)}
                                                />
                                            </Form.Group>

                                            <InputGroup>
                                                <InputGroup.Text id="lastName" htmlFor='lastName'>
                                                    Last Name:
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type='text'
                                                    //id='lastName'
                                                    //ref={userRef}
                                                    placeholder='Enter Last Name'
                                                    autoComplete='off'
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required
                                                    aria-label='Last Name'
                                                    aria-describedby='lastName'
                                                    onFocus={() => setLastNameFocus(true)}
                                                    onBlur={() => setLastNameFocus(false)}
                                                />
                                            </InputGroup>

                                            <label htmlFor='email'>
                                                Email:
                                                <span className={validEmail ? 'valid' : 'hide'}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </span>
                                                <span className={validEmail || !email ? 'hide' : 'invalid'}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </span>
                                            </label>
                                            <input
                                                type='email'
                                                id='email'
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                autoComplete='off'
                                                aria-describedby='emailnote'
                                                aria-invalid={validEmail ? 'false' : 'true'}
                                                onFocus={() => setEmailFocus(true)}
                                                onBlur={() => setEmailFocus(false)} />
                                            <p id='emailnote' className={emailFocus && !validEmail ? '' : 'offscreen'}>
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                                Please enter a valid email.
                                            </p>

                                            <label htmlFor='confirm_email'>
                                                Confirm Email:
                                                <span className={validEmailMatch && matchEmail ? 'valid' : 'hide'}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </span>
                                                <span className={validEmailMatch || !matchEmail ? 'hide' : 'invalid'}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </span>
                                            </label>
                                            <input
                                                type='email'
                                                id='confirm_email'
                                                onChange={(e) => setMatchEmail(e.target.value)}
                                                required
                                                autoComplete='off'
                                                aria-describedby='confirmEmailNote'
                                                aria-invalid={validEmailMatch ? 'false' : 'true'}
                                                onFocus={() => setMatchEmailFocus(true)}
                                                onBlur={() => setMatchEmailFocus(false)} />
                                            <p id='confirmEmailNote' className={matchEmailFocus && !validEmailMatch ? '' : 'offscreen'}>
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                                Must match the email field.
                                            </p>

                                            <label htmlFor='password'>
                                                Password:
                                                <span className={validPwd ? 'valid' : 'hide'}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </span>
                                                <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </span>
                                            </label>
                                            <input
                                                type='password'
                                                id='password'
                                                onChange={(e) => setPwd(e.target.value)}
                                                required
                                                aria-describedby='pwdnote'
                                                aria-invalid={validPwd ? 'false' : 'true'}
                                                onFocus={() => setPwdFocus(true)}
                                                onBlur={() => setPwdFocus(false)} />
                                            <p id='pwdnote' className={pwdFocus && !validPwd ? '' : 'offscreen'}>
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                                8 to 24 characters.<br />
                                                Must include uppercase and lowercase letters, a number, and a special character.<br />
                                                Allowed special characters: <span aria-label='exclamation mark'>!</span>
                                                <span aria-label='question mark'>?</span>
                                                <span aria-label='at symbol'>@</span>
                                                <span aria-label='dollar sign'>$</span>
                                                <span aria-label='percent symbol'>%</span>
                                                <span aria-label='hash symbol'>#</span>
                                            </p>

                                            <label htmlFor='confirm_pwd'>
                                                Confirm Password:
                                                <span className={validPwdMatch && matchPwd ? 'valid' : 'hide'}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </span>
                                                <span className={validPwdMatch || !matchPwd ? 'hide' : 'invalid'}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </span>
                                            </label>
                                            <input
                                                type='password'
                                                id='confirm_pwd'
                                                onChange={(e) => setMatchPwd(e.target.value)}
                                                required
                                                aria-describedby='confirmPwdNote'
                                                aria-invalid={validPwdMatch ? 'false' : 'true'}
                                                onFocus={() => setMatchPwdFocus(true)}
                                                onBlur={() => setMatchPwdFocus(false)} />
                                            <p id='confirmPwNote' className={matchPwdFocus && !validPwdMatch ? '' : 'offscreen'}>
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                                Must match the password field.
                                            </p>

                                            <button
                                                type='submit'
                                                disabled={!firstName || !lastName || !validEmail || !validPwd || !validPwdMatch || !validEmailMatch ? true : false}>
                                                Sign Up
                                            </button>
                                        </Form>
                                    </Card.Body>

                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            )}
        </>
    )
}

export default Register;