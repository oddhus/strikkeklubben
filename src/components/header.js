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

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem
`

const HeaderContent = styled.div`
  margin: 0 auto;
  maxWidth: 960;
  padding: 1.45rem 1.0875rem;
  display: flex;

  >h1{
    margin: 0;
    flex-grow: 1;
    >a{
    color: white;
    text-decoration: none;
    }
  }

  >div{
    margin: auto 0;
  }
`

const UserInfo = styled.div`
  text-align: right;
  color: white;
  >p{
    margin-bottom: 0
  }
`

const LoginLink = styled.div`
  text-align: right;
  >a{
    color: white
  }
`

const Header = ({ siteTitle }) => {

  const [user, initialising, error] = useAuthState(firebase.auth());

  async function handleLogoutClick() {
    await firebase.auth().signOut()
    navigate('/login')
  }
  
  return (
    <HeaderWrapper>
      <HeaderContent>
        <h1>
          <Link to="/">
            {siteTitle}
          </Link>
        </h1>
        <div>
          {(!initialising && user) && 
            <UserInfo>
              <p>Hello, {user.email}</p>
              <LogoutLink onClick={handleLogoutClick}>
                Logout
              </LogoutLink>
            </UserInfo>}
           {(!initialising && !user) &&
            <LoginLink>
              <Link to="/login">
                Login
              </Link>
            </LoginLink>
           } 
        </div>
        </HeaderContent>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
