import React from 'react'
import styled from 'styled-components'
import Img from "gatsby-image"

const ProjectItemWrapper = styled.section`
    border: 1px solid #ddd;
    background: white;
    display: flex;
    padding:8px;
    margin-bottom: 8px;
    h2 {
        small {
            font-size: 14px;
            padding-left:8px;
            font-weight:normal
        }
    }
`

const ProjectItemImageWrapper = styled.div`
    max-width: 150px;
    img {
        max-width: 150px;
    }
`

const ProjectItemContentWrapper = styled.div`
    flex-grow: 1;
    padding-left: 8px;
`

const ProjectItem = ({author, title, description, children, cover}) => {
    console.log(cover)
    return (
        <ProjectItemWrapper>
            <ProjectItemImageWrapper>
                <Img fixed={cover} alt="Strikke prosjekt"  />
            </ProjectItemImageWrapper>
            <ProjectItemContentWrapper>
                <h2>{title} <small>{author}</small></h2>
                <p>{description}</p>
                <div>{children}</div>
            </ProjectItemContentWrapper>
        </ProjectItemWrapper>
    )
}
export default ProjectItem
