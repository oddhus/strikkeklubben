import React from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "gatsby-plugin-firebase"
import {Form, Input, Button} from '../components/Common/Index'

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
      <Form onSubmit={handleSubmit(onSubmit)}>
          <Input name="email" placeholder="email" ref={register({required: true})} />
          {errors.email && "Email is required"}
          <Input name="password" placeholder="password" type="password" ref={register({required: true})} />
          {errors.password && "Password is required"}
          <Button type="submit" value="Login" block/>
      </Form>
    </Layout>
  );
}

export default Login
