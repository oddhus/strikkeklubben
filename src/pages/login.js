import React, { useState } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "gatsby-plugin-firebase"
import { ErrorMsg, Form, Input, Button } from '../components/Common/Index'

import Layout from "../components/layout"

const Login = () => {
  const { register, handleSubmit, errors } = useForm()
  const [user, initialising, error] = useAuthState(firebase.auth())

  const [dbError, setDbError] = useState(null)

  function onSubmit(data){
    firebase.auth().signInWithEmailAndPassword(
      data.email,
      data.password
    ).catch(error =>{
      setDbError(error.message)
    })
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
      <Form onSubmit={handleSubmit(onSubmit)}>
          <Input name="email" placeholder="email" ref={register({required: true})} />
          {errors.email && <ErrorMsg>Email is required</ErrorMsg>}
          <Input name="password" placeholder="password" type="password" ref={register({required: true})} />
          {errors.password && <ErrorMsg>Password is required</ErrorMsg>}
          {dbError && <ErrorMsg>{dbError}</ErrorMsg>}
          <Button type="submit" value="Login" block/>
      </Form>
    </Layout>
  );
}

export default Login
