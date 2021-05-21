import React, { useEffect, useState } from 'react'

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
// import Todo from './components/Todo';
import Logout from './components/Logout'
import firebase, {checkInfo} from "./lib/firebase";

function App() {
  const [user, setUser] = useState({id: "", name: ""});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      let newUser = null;
      console.log("auth", user);
      if (user) {
        newUser = await checkInfo(user);
        console.log("new",newUser);
        setUser(newUser);
      }
    });
  }, []);
  return (
    <div className="container is-fluid">
      <Logout
        key={user.id}
        currentUserId={user.id}
        currentUserName={user.name}
      />
    </div>
  );
}

export default App;
