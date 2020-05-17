import React from 'react'
import { graphql } from "gatsby"
import ProjectItem from '../components/ProjectItem'
import { ProjectComments } from '../components/Common/ProjectComments'

const ProjectTemplate = (props) => {
  return (
    <section>
      <ProjectItem
        cover={props.data.projects.localImage.childImageSharp.fixed}
        title={props.data.projects.title}
        author={props.data.projects.author}
        description={props.data.projects.description}
      />
      <ProjectComments id={props.data.projects.uid} />
    </section>
  )
}

export const query = graphql`
    query ProjectQuery($projectId: String!) {
    projects(uid: {eq: $projectId}) {
        author
        description
        title
        owner
        isPublic
        uid
        id  
        localImage {
          childImageSharp {
            fixed(width: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
    }
  }
`

export default ProjectTemplate