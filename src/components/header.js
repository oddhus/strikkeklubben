import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "gatsby-plugin-firebase"
import styled from 'styled-components'

const LogoutLink = styled.span`
  color: white;
  cursor:pointer;
  &:hover{
    text-decoration:underline;
  }
`

const Header = ({ siteTitle }) => {

  const [user, initialising, error] = useAuthState(firebase.auth());

  async function handleLogoutClick() {
    await firebase.auth().signOut()
    navigate('/login')
  }
  
  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: `flex`
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div>
          {(!initialising && user) && 
            <div>
              Hello, {user.email}
              <LogoutLink onClick={handleLogoutClick}>
                Logout
              </LogoutLink>
            </div>}
           {(!initialising && !user) &&
            <div>
              <Link to="/login">
                Login
              </Link>
            </div>
           } 
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
