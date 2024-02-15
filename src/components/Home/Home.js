import React, {useContext} from 'react';
import classes from './Home.module.css';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import AuthContext from '../StoreContext/auth-context';
export default function Home(props){
    const contxt = useContext(AuthContext);
    return(
        <Card className={classes.home}>
            <h1>welcome Back {contxt.enteredUserame}</h1>
            <Button onClick={contxt.onLogout}>Logout</Button>
        </Card>
    );
}