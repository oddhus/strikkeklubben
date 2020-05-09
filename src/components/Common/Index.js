import styled from 'styled-components'

export const Button = styled.input`
    background: rebeccapurple;
    border-radius:4px;
    color: white;
    cursor: pointer;
    padding: 8px 16px;
    ${props => props.block ? 'display: block; width: 100%;' : ''}


    &:hover{
        background: indigo;
    }
`

export const Form = styled.form`
    max-width: 500px;
    margin: 0 auto;
`

export const Input = styled.input`
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 14px;
    margin-bottom: 8px;
    border-radius:4px;

    &:focus, &active{
        border: 1px solid rebeccapurple;
    }
`