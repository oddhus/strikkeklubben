import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, {useState, useEffect} from "react"
import firebase from "gatsby-plugin-firebase"
import styled from 'styled-components'

const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background: #ddd;
`

const VertifiedUserLink = styled.span`
  >a{
    color: white;
  }  
`

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

  const [user, setUser] = useState(null)
  const [dbError, setDbError] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [setUser])


  function handleLogoutClick() {
    firebase.auth().signOut()
    .then(() => {
      navigate('/login')
    }).catch((error)=>{
      setDbError(error.message)
    })
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
          {dbError && <UserInfo><p>dbError</p></UserInfo>}
          {(user) &&
            <UserInfo>
              <p>Hello, {user.displayName || user.email}</p>
              <div>
                <VertifiedUserLink>
                  <Link to="/account">Account</Link>
                </VertifiedUserLink>
                <Divider />
                <VertifiedUserLink>
                  <Link to="/add-project">Add project</Link>
                </VertifiedUserLink>
                <Divider />
                <LogoutLink onClick={handleLogoutClick}>
                  Logout
                </LogoutLink>
              </div>
            </UserInfo>}
          {(!user) &&
            <LoginLink>
              <Link to="/login">
                Login
              </Link>
              <Divider />
              <Link to="/register">
                Register
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
