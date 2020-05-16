import React, { useState, useRef } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "gatsby-plugin-firebase"

import Layout from "../components/layout"
import { ErrorMsg, Form, Input, Button } from '../components/Common/FormElements'

const Register = () => {
  const { register, handleSubmit, errors, watch } = useForm()
  const password = useRef({})
  password.current = watch("password", "")

  const [user, initialising, error] = useAuthState(firebase.auth())
  const [dbError, setDbError] = useState(null)

  function onSubmit({email, password, username}){
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userProfile) => {
      userProfile.user.sendEmailVerification()
      userProfile.user.updateProfile({displayName: username})
      firebase.functions().httpsCallable('createPublicProfile')({email,username})
    }).then(()=> {
      navigate(`/`)
    }).catch((error) => {
      setDbError(error.message)
    })
  }

  async function validate(value){
    const user = await firebase.firestore().collection('users').where('username','==',value).get()
    return user.empty
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Username" type="text" name="username" 
          ref={register({ 
            required: "Username is required",
            validate: async value => await validate(value)
            })}
        />
        {errors.username && <ErrorMsg>{errors.username.message}</ErrorMsg>}
        {errors.username && errors.username.type === 'validate' && <ErrorMsg>Username is taken</ErrorMsg>}
        <Input placeholder="Email" type="email" name="email" ref={register({ required: "Email is required" })} />
        {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        <Input placeholder="Password" type="password" name="password" 
          ref={register({
            required: "You must specify a password",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters"
            }
          })}               
        />
        {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        <Input placeholder="Confirm password" type="password" name="password_repeat" 
          ref={register({
            validate: value =>
              value === password.current || "The passwords do not match"
          })} 
        />
        {errors.password_repeat && <ErrorMsg>{errors.password_repeat.message}</ErrorMsg>}

        {dbError && <ErrorMsg>{dbError}</ErrorMsg>}
        <Button type="submit" value="Register" block/>
      </Form>
    </Layout>
  )
}

export default Register;