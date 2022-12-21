import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './register.css';

const EMAIL_RGX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PW_RGX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@?#$%])[a-zA-Z0-9!?]{8,24}/;

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
        if (!v1 || !v2){
            setErrMsg('Invalid Entry');
            return;
        }

        if (!firstName || !lastName){
            setErrMsg('First Name, Last Name, Email, & Password are required')
        }

        console.log(`Successfully Submitted`)

    }
    
    return (
        <section>
            <p 
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='firstName'>
                    First Name:
                </label>
                <input
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

                <label htmlFor='lastName'>
                    Last Name:
                </label>
                <input
                type='text'
                id='lastName'
                //ref={userRef}
                autoComplete='off'
                onChange={(e) => setLastName(e.target.value)}
                required
                aria-describedby='uidnote'
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}/>

                <label htmlFor='password'>
                    Password: 
                    <span className={validPwd ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes}/>
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
                onBlur={() => setPwdFocus(false)}/>
                <p id='pwdnote' className={pwdFocus && !validPwd ? '' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 characters.<br/>
                    Must include uppercase and lowercase letters, a number, and a special character.<br/>
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
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validPwdMatch || !matchPwd ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes}/>
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
                onBlur={() => setMatchPwdFocus(false)}/>
                <p id='confirmPwNote' className={matchPwdFocus && !validPwdMatch ? '' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Must match the password field.
                </p>

                <label htmlFor='email'>
                    Email: 
                    <span className={validEmail ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validEmail || !email ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes}/>
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
                onBlur={() => setEmailFocus(false)}/>
                <p id='emailnote' className={emailFocus && !validEmail ? '' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Please enter a valid email.
                </p>

                <label htmlFor='confirm_email'>
                    Confirm Email: 
                    <span className={validEmailMatch && matchEmail ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validEmailMatch || !matchEmail ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes}/>
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
                onBlur={() => setMatchEmailFocus(false)}/>
                <p id='confirmEmailNote' className={matchEmailFocus && !validEmailMatch ? '' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Must match the email field.
                </p>

                <button 
                type='submit' 
                disabled={ !firstName || !lastName || !validEmail || !validPwd || !validPwdMatch || !validEmailMatch ? true : false}>
                    Sign Up
                </button>
            </form>


        </section>
    )
}

export default Register;