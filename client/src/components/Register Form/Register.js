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
    const [validMatch, setValidPwdMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

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
    
    return (
        <section>
            <p 
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive">{errMsg}</p>
            <form>
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
                aria-describedby='uidnote'
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}/>

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
            </form>
        </section>
    )
}

export default Register;