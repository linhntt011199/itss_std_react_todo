import React from 'react';
import firebase from '../lib/firebase';
import SignInScreen from './SignInScreen';
import Todo from './Todo';
import UploadImage from './UploadImage';
import { updateUser } from "../lib/firebase";

function Logout({currentUserImage, currentUserId, currentUserName}){
    console.log(currentUserName);
    const signOut = () => {
      firebase.auth().signOut();
      window.location = "index.html";
    }
    const changeImage = async downloadUrl => {
      await updateUser(currentUserId, downloadUrl);
    }

    if(currentUserId != ""){
        return (
            <div className="navbar-begin">
              <div className="navbar-item">
                <UploadImage 
                  userImage={currentUserImage}
                  changeImage={changeImage}
                />
                &nbsp;{currentUserName}
              </div>
              <div className="navbar-item">
                <button className="button is-danger is-light is-small" onClick={signOut}> Logout </button>
              </div>
              <Todo/>
            </div >
        )
    }else{
        return <SignInScreen/>
    }
};

export default Logout;