import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Form, InputGroup, Card } from 'react-bootstrap';
import axios from '../../../api/axois';
import { Link } from 'react-router-dom';

const EMAIL_RGX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PW_RGX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@?#$%])[a-zA-Z0-9!?]{8,24}/;
const USER_REGISTER_URL = '/users/'

const UserRegister = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    // eslint-disable-next-line
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    // eslint-disable-next-line
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
        setValidEmail(result);
        const match = email === matchEmail;
        setValidEmailMatch(match)
    }, [email, matchEmail])

    useEffect(() => {
        const result = PW_RGX.test(pwd);
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
            await axios.post(USER_REGISTER_URL, JSON.stringify({ firstName, lastName, email, password: pwd }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            setSuccess(true)
            // clear input fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setMatchEmail('');
            setPwd('');
            setMatchPwd('');
            //navigate(EMP_LOGIN_URL) 
            //navigate(from, { replace: true })
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (errMsg.response?.status === 409) {
                setErrMsg('This Email already exists')
                // add sign in button
            } else if (error.response?.status === 409) {
                setErrMsg(`This Email already exists, Please sign in.`)
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }

    }

    return (
        <>
            {success ? (
                <section className='text-center'>
                    <h1>Success!</h1>
                    <h5>Account successfully created.</h5>
                    <h5>Please Sign In.</h5>
                    <button className='btn btn-warning'>
                        <Link to={'/user-login'}> Sign In</Link>
                    </button>
                </section>
            ) : (
                <section>
                    <Container className='my-3'>
                        <Row className='d-flex justify-content-center align-items-center'>
                            <Col md={6}>
                                <Card className='visual rounded-3'>
                                    <h4
                                        ref={errRef}
                                        className={errMsg ? 'errfont text-center' : 'offscreen'}
                                        aria-live="assertive">
                                        {errMsg}
                                    </h4>
                                    <Card.Body>
                                        <h1 className="text-center">Client Register</h1>
                                        <Form onSubmit={handleSubmit}>


                                            <InputGroup className='my-3'>
                                                <InputGroup.Text id='first_name' htmlFor='firstName'>
                                                    First Name:
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type='text'
                                                    id='firstName'
                                                    ref={userRef}
                                                    autoComplete='off'
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    required
                                                    aria-label='First Name'
                                                    aria-invalid={firstName ? 'false' : 'true'}
                                                    aria-describedby='first_name'
                                                    onFocus={() => setFirstNameFocus(true)}
                                                    onBlur={() => setFirstNameFocus(false)}
                                                />
                                            </InputGroup>


                                            <InputGroup className='my-3'>
                                                <InputGroup.Text id="last_name" htmlFor='lastName'>
                                                    Last Name:
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type='text'
                                                    //id='lastName'
                                                    //ref={userRef}
                                                    //placeholder='Enter Last Name'
                                                    autoComplete='off'
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    required
                                                    aria-label='Last Name'
                                                    aria-describedby='last_name'
                                                    onFocus={() => setLastNameFocus(true)}
                                                    onBlur={() => setLastNameFocus(false)}
                                                />
                                            </InputGroup>


                                            <InputGroup className='my-3'>
                                                <InputGroup.Text htmlFor='email'>
                                                    Email:
                                                    <span className={validEmail ? 'valid' : 'hide'}>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </span>
                                                    <span className={validEmail || !email ? 'hide' : 'invalid'}>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </span>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type='email'
                                                    id='email'
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    autoComplete='off'
                                                    //placeholder='Enter Email'
                                                    aria-label='Email'
                                                    aria-describedby='emailnote'
                                                    aria-invalid={validEmail ? 'false' : 'true'}
                                                    onFocus={() => setEmailFocus(true)}
                                                    onBlur={() => setEmailFocus(false)}
                                                />

                                            </InputGroup>
                                            <p id='emailnote' className={emailFocus && !validEmail ? '' : 'offscreen'}>
                                                <FontAwesomeIcon icon={faInfoCircle} className="mx-1" />
                                                Please enter a valid email.
                                            </p>

                                            <InputGroup className='my-3'>
                                                <InputGroup.Text htmlFor='confirm_email'>
                                                    Confirm Email:
                                                    <span className={validEmailMatch && matchEmail ? 'valid' : 'hide'}>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </span>
                                                    <span className={validEmailMatch || !matchEmail ? 'hide' : 'invalid'}>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </span>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type='email'
                                                    id='confirm_email'
                                                    onChange={(e) => setMatchEmail(e.target.value)}
                                                    required
                                                    autoComplete='off'
                                                    aria-describedby='confirmEmailNote'
                                                    aria-invalid={validEmailMatch ? 'false' : 'true'}
                                                    onFocus={() => setMatchEmailFocus(true)}
                                                    onBlur={() => setMatchEmailFocus(false)}
                                                />
                                            </InputGroup>
                                            <p id='confirmEmailNote' className={matchEmailFocus && !validEmailMatch ? '' : 'offscreen'}>
                                                <FontAwesomeIcon icon={faInfoCircle} className="mx-1" />
                                                Must match the email field.
                                            </p>

                                            <InputGroup className='my-3'>
                                                <InputGroup.Text htmlFor='password'>
                                                    Password:
                                                    <span className={validPwd ? 'valid' : 'hide'}>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </span>
                                                    <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </span>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type='password'
                                                    id='password'
                                                    onChange={(e) => setPwd(e.target.value)}
                                                    required
                                                    aria-describedby='pwdnote'
                                                    aria-invalid={validPwd ? 'false' : 'true'}
                                                    onFocus={() => setPwdFocus(true)}
                                                    onBlur={() => setPwdFocus(false)}
                                                />
                                            </InputGroup>
                                            <p id='pwdnote' className={pwdFocus && !validPwd ? '' : 'offscreen'}>
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                                <br />
                                                Password Must include: <br /> 8 to 24 characters.<br /> Uppercase and lowercase letters. <br /> A Number. <br /> A special character.<br />
                                                Allowed special characters: <span aria-label='exclamation mark'>!</span>
                                                <span aria-label='question mark'>?</span>
                                                <span aria-label='at symbol'>@</span>
                                                <span aria-label='dollar sign'>$</span>
                                                <span aria-label='percent symbol'>%</span>
                                                <span aria-label='hash symbol'>#</span>
                                            </p>

                                            <InputGroup className='my-3'>
                                                <InputGroup.Text htmlFor='confirm_pwd'>
                                                    Confirm Password:
                                                    <span className={validPwdMatch && matchPwd ? 'valid' : 'hide'}>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </span>
                                                    <span className={validPwdMatch || !matchPwd ? 'hide' : 'invalid'}>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </span>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    type='password'
                                                    id='confirm_pwd'
                                                    onChange={(e) => setMatchPwd(e.target.value)}
                                                    required
                                                    aria-describedby='confirmPwdNote'
                                                    aria-invalid={validPwdMatch ? 'false' : 'true'}
                                                    onFocus={() => setMatchPwdFocus(true)}
                                                    onBlur={() => setMatchPwdFocus(false)}
                                                />
                                            </InputGroup>
                                            <p id='confirmPwNote' className={matchPwdFocus && !validPwdMatch ? '' : 'offscreen'}>
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                                Must match the password field.
                                            </p>
                                            <div className='text-center'>
                                                <button
                                                    className='btn btn-warning'
                                                    type='submit'
                                                    disabled={!firstName || !lastName || !validEmail || !validPwd || !validPwdMatch || !validEmailMatch ? true : false}>
                                                    Sign Up
                                                </button>
                                            </div>

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

export default UserRegister;