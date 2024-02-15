import React, {useContext} from 'react';
import classes from './Navigation.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../StoreContext/auth-context';
export default function Navigation(props){
    const ctx = useContext(AuthContext);
    return(
            <nav className={classes.nav}>
                 <ul>
                     {ctx.isLoggedIn && (<li><a href="/">Users</a></li>)}
                     {ctx.isLoggedIn && (<li><a href="/">Admin</a></li>)}
                     {ctx.isLoggedIn && (<li><Button onClick={ctx.onLogout} className={classes.button}>Logout</Button></li>)}
                 </ul>
            </nav>
    );
};