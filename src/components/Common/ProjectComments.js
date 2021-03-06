import React, { useState, useEffect } from 'react'
import firebase from "gatsby-plugin-firebase"
import moment from 'moment'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { ErrorMsg, Input, Button } from './FormElements'

const CommentError = styled.p`
  color: #707070;
  font-style: italic;
  margin-top: 32px;
`

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

  const { register, handleSubmit, errors, reset } = useForm()
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState([])
  const [dbError, setDbError] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [setUser])

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('projects')
      .doc(id)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        setIsLoaded(true)
        setComments(snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })))
      })
    return () => unsubscribe()
  }, [setComments, id])

  function onSubmit(data){
    firebase.functions()
    .httpsCallable('postComment')({
      message: data.message,
      id,
      username: user.displayName})
    .then(() => {
      reset()
    }).catch((error) => {
      setDbError(error.message)
    })
  }

  if (!isLoaded) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      {/* {authError && <CommentError>authError.message</CommentError>} */}
      {(!user) && <CommentError>You must be logged in to post a comment</CommentError>}
      {(user) &&
       <CommentForm onSubmit={handleSubmit(onSubmit)}>
        <Input name="message" placeholder="Comment" ref={register({required: true})} />
        {errors.message && <ErrorMsg>The message cannot be empty</ErrorMsg>}
        {dbError && <ErrorMsg>{dbError}</ErrorMsg>}
        <Button type="submit" value="Post Comment" />
      </CommentForm>}
      {/* {dataError && <CommentError>{dataError.message}</CommentError>}   */}
      {comments.map(comment => (
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