import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


import firebase, { uiConfig } from "../lib/firebase";

function SignInScreen(){
  return (
    <div className="column panel-block">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default SignInScreen;