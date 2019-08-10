import React, { useEffect, useState } from 'react'

import logo from '../assets/logo.svg'
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
import './Main.css'
import api from '../services/api'

//match é usado para pegar os params enviados
const Main = ({ match }) => {

  //toda vez que preciso manipular variavel 
  //pelo component é interessante usar o state
  const [users, setUsers] = useState([])

  //chama a api assim que o component é exibido, 
  //recebe a função que executa e quando executa
  useEffect(() => {
    const loadUsers = async () => {
      const response = await api.get('/devs', {
        headers: { user: match.params.id }
      })

      setUsers(response.data)
    }
    loadUsers()
  }, [match.params.id])


  return (
    <div className="main-container">
      <img src={logo} alt="TinDev" />
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <img src={user.avatar} alt={user.name} />
            <footer>
              <strong>{user.name} </strong>
              <p>{user.bio}</p>
            </footer>
            <div className="buttons">
              <button type="button">
                <img src={dislike} alt="Dislike" />
              </button>

              <button type="button">
                <img src={like} alt="Like" />
              </button>
            </div>
          </li>
        )
        )}
      </ul>
    </div>
  )
}

export default Main