import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'

import ProjectItem from "../components/ProjectItem"

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
