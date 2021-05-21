import React from 'react';
import firebase from '../lib/firebase';
import SignInScreen from './SignInScreen';
import Todo from './Todo';

function Logout({currentUserId, currentUserName}){

    const signOut = () => {
      firebase.auth().signOut();
      window.location = "index.html";
    }

    if(currentUserId != ""){
        return (
            <div class="navbar-begin">
              <div class="navbar-item">
                {currentUserName}
              </div>
              <div class="navbar-item">
                <button class="button is-danger is-light is-small" onClick={signOut}> Logout </button>
              </div>
              <Todo/>
            </div >
        )
    }else{
        return <SignInScreen/>
    }
};

export default Logout;