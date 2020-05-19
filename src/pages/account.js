import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import styled from 'styled-components'

import { Form, Button } from '../components/Common/FormElements'

export const ContentContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
`

const Account = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [setUser])

  function onSubmit(e){
    e.preventDefault()
    user.sendEmailVerification()
  }

  if(loading) {
      return <ContentContainer>
          <p>Retrieving user data...</p>
      </ContentContainer>
  }

  if (!loading && !user){
    navigate(`/login`)
  }

  return (
    <ContentContainer>
        {user && <div>
            <p>Username: {user.displayName}</p>
            <p>Email: {user.email} </p>
            <p>Status: {user.emailVerified ? "Verified" : "Not verified"} </p>
            {!user.emailVerified && <Form onSubmit={onSubmit}>
                <Button type="submit" value="Verify email" block/>
            </Form>}
        </div>}
    </ContentContainer>
  )
}

export default Account