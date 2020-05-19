import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import firebase from "gatsby-plugin-firebase"

import { ErrorMsg, Form, Input, Button } from '../components/Common/FormElements'

const Login = () => {
  const { register, handleSubmit, errors } = useForm()
  const [dbError, setDbError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [setUser])

  useEffect(() => {
    if(user){
      navigate('/')
    }
  })

  function onSubmit(data){
    firebase.auth().signInWithEmailAndPassword(
      data.email,
      data.password
    ).then(() => {
      navigate(`/`)
    }).catch(error =>{
      setDbError(error.message)
    })
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
  )
}

export default Login
