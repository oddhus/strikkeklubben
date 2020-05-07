import React from "react"
import { Link, navigate } from "gatsby"
import { useForm } from "react-hook-form"
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "gatsby-plugin-firebase"

import Layout from "../components/layout"

const Login = () => {
  const { register, handleSubmit, errors } = useForm()
  const [user, initialising, error] = useAuthState(firebase.auth())

  function onSubmit(data){
    firebase.auth().signInWithEmailAndPassword(
      data.email,
      data.password
    )
  }

  if (initialising) {
    return (
      <Layout>
        <p>Loading user...</p>
      </Layout>
    )
  }

  if (user){
    navigate(`/`)
  }

  return (
    <Layout>
    <h1>Login</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <input name="email" placeholder="email" ref={register({required: true})} />
        {errors.email && "Email is required"}
        <input name="password" placeholder="password" type="password" ref={register({required: true})} />
        {errors.password && "Password is required"}
        <input type="submit" value="Login"/>
      </form>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
}

export default Login
