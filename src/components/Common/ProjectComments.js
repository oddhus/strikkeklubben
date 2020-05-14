import React, { useState } from 'react'
import firebase from "gatsby-plugin-firebase"
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'

import { ErrorMsg, Input, Button } from './FormElements'

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
  >div {
    display: flex;
    justify-content: space-between;

    >strong{
      color: 666;
      font-size: 80%;
    }

    >p{
      color: #ddd;
      font-size: 80%;
      margin: 0;
    }
  }

  border-bottom: 1px solid #ddd;
  padding: 4px 0;
`

export const ProjectComments = ({ id }) => {

  const { register, handleSubmit, errors } = useForm()
  const [user, initialising, authError] = useAuthState(firebase.auth())
  const [data, loading, dataError] = useCollectionData(
    firebase.firestore()
      .collection('projects')
      .doc(id)
      .collection('comments')
      .orderBy('createdAt', 'desc'),
    {
      idField: "id",
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const [dbError, setDbError] = useState(null)

  async function onSubmit(data){
    firebase.functions()
    .httpsCallable('postComment')({message: data.message,id})
    .catch((error) => {
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
        {errors.message && <ErrorMsg>The message cannot be empty</ErrorMsg>}
        {dbError && <ErrorMsg>{dbError}</ErrorMsg>}
        <Button type="submit" value="Post Comment" />
      </CommentForm>  
      {data.map(comment => (
        <CommentListItem key={comment.id}>
          <div>
            <strong>{comment.author}</strong>
            {comment.createdAt && <p>{moment.unix(comment.createdAt.seconds).fromNow()}</p>}
          </div>
          <div>{comment.message}</div>
        </CommentListItem>
      ))}
    </div>
  )
}