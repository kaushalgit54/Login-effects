import React, {useState, useEffect} from "react";
//React context is usefull in managing central state management that makes its common attributes and properties available to its component globally
const AuthContext = React.createContext({
   isLoggedIn: false,
   onLogout: ()=>{},
   onLogin : (email, password)=>{},
   enteredUserame: '',
});
export const AuthContextProvider = (props)=>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [enteredUserame, setUsername] = useState('');

    useEffect(()=>{
        const getUserLogin = localStorage.getItem('isLoggedIn');
        if(getUserLogin === '1'){
           setIsLoggedIn(true);
        }
     },[]);

    const logoutHandler = ()=>{
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };
    const loginHandler= (email, password)=>{
        localStorage.setItem('isLoggedIn','1');
        const result = email.substring(0, email.indexOf("@"));
        setUsername(result);
        setIsLoggedIn(true);
        localStorage.setItem('Password',password);
    };
    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn,onLogout: logoutHandler, onLogin: loginHandler,enteredUserame:enteredUserame}}>{props.children}</AuthContext.Provider>;
};
export default AuthContext;