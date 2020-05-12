import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'
import ProjectItem from '../components/ProjectItem'
import { ProjectComments } from '../components/Common/ProjectComments'

const ProjectTemplate = (props) => {
    console.log(props.data)
    return (
        <Layout>
            <ProjectItem
                cover={props.data.projects.localImage.childImageSharp.fixed}
                title={props.data.projects.title}
                author={props.data.projects.author}
                description={props.data.projects.description}
            >
            </ProjectItem>
            <ProjectComments id={props.data.projects.uid}/>
        </Layout>
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