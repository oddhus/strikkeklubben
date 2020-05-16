import React from "react"
import { Link, graphql } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import styled from 'styled-components'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import Layout from "../components/layout"
import ProjectItem from "../components/ProjectItem"
import { node } from "prop-types"


const LinkButton = styled.div`
  text-align: right;
  a {
    background: rebeccapurple;
    padding: 8px;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    &:hover{
      background: indigo;
    }
  }
`

const IndexPage = (props) => {

  const [data, loading, error] = useCollectionData(
    firebase.firestore().collection('projects').where('isPublic','==',true),
    {
      idField: "id",
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (<>
    {props.data.allProjects.edges.map(project => (
      <ProjectItem
        cover={project.node.localImage.childImageSharp.fixed}
        description={project.node.description}
        author={project.node.author}
        title={project.node.title}
        key={project.node.id}>
        <LinkButton>
          <Link to = {`/project/${project.node.uid}`}>Join the conversation</Link>
        </LinkButton>
      </ProjectItem>
    ))}
    {/* <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
    </p>
    {data && data.map((project) => (
      <ProjectItem
        cover={project.imgUrl}
        description={project.description}
        author={project.author}
        title={project.title}
        key={project.id}>
        <LinkButton>
          <Link to = {`/project/${project.id}`}>Join the conversation</Link>
        </LinkButton>
      </ProjectItem>
    ))} */}
  </>
  )
}

export const query = graphql`
{
  allProjects {
    edges {
      node {
        author
        description
        title
        owner
        isPublic
        uid
        id  
        localImage {
          childImageSharp {
            fixed(width: 200, height: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
}

`

export default IndexPage
