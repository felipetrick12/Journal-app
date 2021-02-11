import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch,Redirect} from "react-router-dom";
import { JournalScreen } from '../components/Journal/JournalScreen';
import {firebase} from '../firebase/firebase-config';



import AuthRouter from './AuthRouter'
import { login } from '../actions/auth';
import { useDispatch } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { setNotes, starLoading } from '../actions/notes';


export default function AppRouter() {

  const dispatch = useDispatch();

  const [ checking, setChecking ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);



  useEffect(() => {
      
      firebase.auth().onAuthStateChanged(async (user) => {

          if ( user?.uid ) {
              dispatch( login( user.uid, user.displayName ) );
              setIsLoggedIn( true );
             
             dispatch(starLoading(user.uid));
             
          } else {
              setIsLoggedIn( false );
          }

          setChecking(false);

      });
      
  }, [ dispatch, setChecking, setIsLoggedIn ])


  if ( checking ) {
      return (
          <h1>..Wait..</h1>
      )
  }


    return (
        <Router>
        <div>
          <Switch>
                  <PublicRoute path="/auth" component={AuthRouter}  isAuthenticated={isLoggedIn}/>
                  
                  <PrivateRoute exact path="/" component={JournalScreen} isAuthenticated={isLoggedIn}/>

                  <Redirect to='/auth/login'/>
          </Switch>
        </div>
      </Router>
    )
}
