import React, { useState} from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "gatsby-plugin-firebase"

import Layout from "../components/layout"

const Register = () => {
  const { register, handleSubmit, errors } = useForm()
  const [user, initialising, error] = useAuthState(firebase.auth())
  const [dbError, setDbError] = useState("")

  function onSubmit(data){
      firebase.auth().createUserWithEmailAndPassword(
        data.email,
        data.password
      ).then(user => {
        firebase.firestore().collection('users').doc(user.user.uid).set({
          username: data.username,
          email: data.email
        }).then(() => {
          navigate(`/`)
        })
      }).catch(error => {
        setDbError(error.message)
      })
  }
  if (initialising) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (user) {
    navigate(`/`)
  }

  return (
  
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="username" type="text" name="username" ref={register({ required: true })} />
        <input placeholder="email" type="email" name="email" ref={register({ required: true })} />
        <input placeholder="password" type="password" name="password" ref={register({ required: true })} />
        <input placeholder="confirm password" type="password" name="confirmPassword" ref={register({ required: true })} />

        <input type="submit" value="Register" />
      </form>
    </Layout>
  )
}

export default Register;