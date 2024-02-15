import React, {useState,useEffect, useReducer, useContext} from "react";

import Card from '../UI/Card/Card.js';
import classes from './Login.module.css';
import Button from "../UI/Button/Button.js";
import logo from '../../Images/logo2.png';
import AuthContext from "../StoreContext/auth-context.js";
const Login = (props)=>{
    const contxt = useContext(AuthContext);
    const emailReducer = (state, action)=>{
        if(action.type === 'USER_INPUT'){
           return {value : action.val, isValid: action.val.includes('@')};
        }
        if(action.type === 'INPUT_BLUR'){
           return {value :state.value, isValid: state.value.includes('@')};
        }
        return {value:'', isValid: null}; 
    };

    const passwordReducer =(state, action)=>{
        if(action.type === 'USER_PASS'){
            return {value: action.value, isValid : action.value.trim().length > 6};
        }
        if(action.type === 'PASS_BLUR'){
            return {value: state.action, isValid: state.value.trim().length>6};
        }
        return {value:"", isValid: null};
    }
    // const [enteredEmail,setEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword,setPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] =useState(false);

     const [emailState, dispatchEmail] = useReducer(emailReducer,{value:"", isValid:null});
     const [passwordState, dispatchPassword] = useReducer(passwordReducer,{value:"", isValid:null});
     
     const {isValid : emailIsValid} = emailState;
     const {isValid : passwordIsValid} = passwordState;
    //Here useEffect is called and validating email and password while entering them and this happens every keystroke
    // Also we haven't changed serFormIsValid because it is default false and will not affect the state
    //hence shorten the code overall that was written in emailchangeHandler and passwordChangeHandler function
    useEffect(()=>{
       const identifier = setTimeout(()=>{
            // setTimeout will run only once if mutiple requests are asked and hence helps in httpRequests such that it doesn't need to fetch httpRequest every time
           console.log('Checking form validity');
           // This makes run the useEffect up to certain extent only
             setFormIsValid(emailIsValid && passwordIsValid);
            },1000);
            //In useEffect hook we can also return a function like 
             return ()=>{
                //This function will run every keystrokes 
                console.log('CLEANUP');
                clearTimeout(identifier);
             };
        },[emailIsValid,passwordIsValid]);

    const emailChangeHandler = (event)=>{
        dispatchEmail({type:'USER_INPUT',val: event.target.value});
        setFormIsValid(event.target.value.includes('@') && passwordState.isValid > 6);
    }
    const passwordChangeHandler = (event)=>{
        // setPassword(event.target.value);
        dispatchPassword({type: 'USER_PASS', value: event.target.value});
        setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
    }
    const validateEmailHandler = ()=>{
        dispatchEmail({type:'INPUT_BLUR'});
    }
    const validatePasswordHandler = ()=>{
        // setPasswordIsValid(enteredPassword.trim().length > 6);
        dispatchPassword({type:'PASS_BLUR'});
    }
    const submitHandler = (event)=>{
        event.preventDefault();
        contxt.onLogin(emailState.value, passwordState.value);
    }
   return(
    <Card className={classes.login}>
         <img src={logo} className={classes.image} />
        <form onSubmit={submitHandler}>
            <div className={`${classes.control} ${emailState.isValid === false? classes.invalid:''}`}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
            </div>
            <div className={`${classes.control} ${passwordState.isValid === false? classes.invalid:''}`}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>
            </div>
            <div className={classes.actions}>
                <Button type='submit' className={classes.button} disabled = {!formIsValid}>Login</Button>
            </div>
        </form>
    </Card>
   );
}
export default Login;