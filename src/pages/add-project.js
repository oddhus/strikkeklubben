import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import firebase from "gatsby-plugin-firebase"
import styled from 'styled-components'

import { ErrorMsg, Form, Input, Button, TextArea } from '../components/Common/FormElements'

export const ContentContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
`

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
  const [dbError, setDbError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setloading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      setloading(false)
      if (!user) {
        navigate("/login")
      }  
    })
    return () => unsubscribe()
  }, [setUser])

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

  if (loading) {
    return (
      <ContentContainer>
        <p>Loading...</p>
      </ContentContainer>
    )
  }

  
  if (user && !user.emailVerified){
    return <ContentContainer>
      <p>You must verify your email to create a project</p>
    </ContentContainer>
  }

  return (
    <ContentContainer>
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
    </ContentContainer>
  )
}

export default AddProject