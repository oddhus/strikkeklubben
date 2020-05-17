import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "gatsby-plugin-firebase"
import { ErrorMsg, Form, Input, Button } from '../components/Common/FormElements'

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
      <>
        <p>Loading user...</p>
      </>
    )
  }

  if (user){
    navigate(`/`)
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <Input name="email" placeholder="email" ref={register({required: true})} />
          {errors.email && <ErrorMsg>Email is required</ErrorMsg>}
          <Input name="password" placeholder="password" type="password" ref={register({required: true})} />
          {errors.password && <ErrorMsg>Password is required</ErrorMsg>}
          {dbError && <ErrorMsg>{dbError}</ErrorMsg>}
          <Button type="submit" value="Login" block/>
      </Form>
    </>
  );
}

export default Login
