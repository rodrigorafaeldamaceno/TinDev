import React from 'react'

//match é usado para pegar os params enviados
const Main = ({ match }) => {
    return (
        <h1>{match.params.id}</h1>
    )
}

export default Main