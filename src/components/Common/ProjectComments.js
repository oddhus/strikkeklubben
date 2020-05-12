import React, { useState } from 'react'
import firebase from "gatsby-plugin-firebase"
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'

import { ErrorMsg, Input, Button } from '../../components/Common/Index'

const CommentForm = styled.form`
  display: flex;
  margin-top: 32px;

  ${Input}{
    margin-right: 8px;
    margin-top: auto;
    margin-bottom: auto;
  }

  ${Button}{
    margin: auto 0;
  }
`

const CommentListItem = styled.div`
  >strong{
      color: 666;
      font-size: 80%;
  }

  border-bottom: 1px solid #ddd;
  padding: 4px 0;
`

export const ProjectComments = ({ id }) => {

  const { register, handleSubmit, errors } = useForm()
  const [user, initialising, authError] = useAuthState(firebase.auth())
  const [data, loading, dataError] = useCollectionData(
    firebase.firestore().collection('projects').doc(id).collection('comments'),
    {
      idField: "id",
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const [dbError, setDbError] = useState(null)

  async function onSubmit(data){
    console.log(data)
    const postComment = firebase.functions().httpsCallable('postComment')
    postComment({message: data.message,id}).catch((error) => {
      console.log(error)
    })

  }

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <CommentForm onSubmit={handleSubmit(onSubmit)}>
        <Input name="message" placeholder="Comment" ref={register({required: true})} />
        {errors.message && <ErrorMsg>Password is required</ErrorMsg>}
        {dbError && <ErrorMsg>{dbError}</ErrorMsg>}
        <Button type="submit" value="Post Comment" />
      </CommentForm>  
      {data.map(comment => (
        <CommentListItem key={comment.id}>
          <strong>{comment.author}</strong>
          <div>{comment.message}</div>
        </CommentListItem>
      ))}
    </div>
  )
}