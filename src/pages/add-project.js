import React, { useState } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "gatsby-plugin-firebase"
import styled from 'styled-components'

import Layout from "../components/layout"
import { ErrorMsg, Form, Input, Button, TextArea } from '../components/Common/FormElements'

const FormField = styled.div`
    margin-bottom: 20px
`
const SuccessMessage = styled.p`
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
  color: #270;
  background-color: #DFF2BF;
`

let reader
if (typeof window !== 'undefined'){
  reader = new FileReader()
}

const AddProject = () => {
  const { register, handleSubmit, errors, reset } = useForm()
  const [user, initialising, error] = useAuthState(firebase.auth())
  const [dbError, setDbError] = useState(null)
  const [success, setSuccess] = useState(false)

  async function onSubmit({ title, desc, image }) {
    const transformedImg = await toBase64(image[0])
    firebase.functions().httpsCallable('createProject')({ title, desc, image: transformedImg, username: user.displayName })
      .then(() => {
        setSuccess(true)
        reset()
      }).catch((error) => {
        setDbError(error.message)
      })
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  if (initialising) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  if (!user) {
    navigate(`/login`)
  }

  if (!user.emailVerified){
    return <>
      <p>You must verify your email to create a project</p>
    </>
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <strong>Choose a fitting title for your project</strong>
          <Input placeholder="Title" type="text" name="title" ref={register({ required: "Title is required" })} onInput={() => setSuccess(false)} />
          {errors.title && <ErrorMsg>{errors.title.message}</ErrorMsg>}
        </FormField>
        <FormField>
          <strong>Describe your project</strong>
          <TextArea placeholder="Description" type="text" name="desc" ref={register({ required: "Description is required" })} onInput={() => setSuccess(false)} />
          {errors.desc && <ErrorMsg>{errors.desc.message}</ErrorMsg>}
        </FormField>
        <FormField>
          <strong>Procject picture</strong>
          <Input placeholder="Image" type="file" name="image" ref={register} />
          {errors.image && <ErrorMsg>{errors.image.message}</ErrorMsg>}
        </FormField>
        {dbError && <ErrorMsg>{dbError}</ErrorMsg>}
        {success && <SuccessMessage>Your project was added! It may take som time before it is public.</SuccessMessage>}
        <Button type="submit" value="Add new project" block />
      </Form>
    </>
  )
}

export default AddProject