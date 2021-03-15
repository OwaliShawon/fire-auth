import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// else {
//   firebase.app(); // if already initialized, use that one
// }

function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSingIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(response => {
        const { displayName, email, photoURL } = response.user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photoURL: photoURL
        }
        setUser(signedInUser);
        // console.log(displayName, email, photoURL);
        // console.log(response);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

  const handleSingOut = () => {
    firebase.auth()
      .signOut()
      .then((response) => {
        const signOutUser = {
          isSignIn: false,
          name: '',
          email: '',
          photoURL: '',
        }
        setUser(signOutUser);

      })
      .catch((error) => {

      });

  }

  const handleChange = (event) => {
    debugger;
    // console.log(event.target.name, event.target.value);
    let isFormValid = true;
    if (event.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid);
    }
    if (event.target.name === 'password') {
      const isPassValid = event.target.value > 6;
      const isPassHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPassValid && isPassHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (event) => {

  }

  return (
    <div className="App">
      {
        user.isSignIn ? <button onClick={handleSingOut}>Sing Out</button> :
          <button onClick={handleSingIn}>Sing In</button>
      }
      {
        user.isSignIn && <div>
          <p>Welcome! {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      }


      <h1>Our own authentication</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>


      <form onsSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onBlur={handleChange}></input>
        <br />
        <input type="text" name="email" placeholder="enter email" onBlur={handleChange} />
        <br />
        <input type="password" name="password" placeholder="enter pass" onBlur={handleChange} />
        <br /> <br />
        <input type="submit" value="SUBMIT" />
      </form>

    </div>
  );
}

export default App;
