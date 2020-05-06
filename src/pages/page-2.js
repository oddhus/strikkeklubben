import React from "react"
import { Link } from "gatsby"
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "gatsby-plugin-firebase"

import Layout from "../components/layout"

const CurrentUser = () => {
  const [user, initialising, error] = useAuthState(firebase.auth());
  const login = () => {
    firebase.auth().signInWithEmailAndPassword('test@test.com', 'password');
  };
  const logout = () => {
    firebase.auth().signOut();
  };

  if (initialising) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return <button onClick={login}>Log in</button>;
}

const SecondPage = () => (
  <Layout>
    <h1>Hi from the second page</h1>
    <CurrentUser />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
