import Navigation from "./Navigation";
import classes from './MainHeader.module.css';

export default function MainHeader(props){
   return(
    <header className={classes.mainheader}>
        <h1>A Login Page</h1>
        <Navigation></Navigation>
    </header>
   );
}
