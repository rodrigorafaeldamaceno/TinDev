import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


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

  const handleLike = async (id) => {
    //console.log('like', id)
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    })
    setUsers(users.filter(user => user._id != id))
  }


  const handleDislike = async (id) => {
    //console.log('dislike', id)
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    })

    setUsers(users.filter(user => user._id != id))
  }

  return (
    <div className="main-container">
      <Link to="/">

        <img src={logo} alt="TinDev" />
      </Link>

      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name} </strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons" >
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />

                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
          <div className="empty">Acabou</div>
        )}

    </div>
  )
}

export default Main