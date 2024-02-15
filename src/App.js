import React, {useContext} from 'react';
import MainHeader from './components/MainHeader/MainHeader';
import classes from './App.module.css';
import Login from '../src/components/Login/Login';
import Home from '../src/components/Home/Home';
import AuthContext from './components/StoreContext/auth-context';

function App() {
   const contxt = useContext(AuthContext);

  return (
   <div className={classes.App}>
      <MainHeader></MainHeader>
      <main>
         {!contxt.isLoggedIn && <Login></Login>}
         {contxt.isLoggedIn && <Home></Home>}
      </main>
    </div>
  );
}

export default App;