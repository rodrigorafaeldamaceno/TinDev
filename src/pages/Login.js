import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import './Login.css';

import api from '../services/api'

const Login = ({ history }) => {
  const [username, setUsername] = useState("")

  const handleSubmit = async (e) => {
    //evita o comportamento padrão de redirecionar pra outra pagina
    e.preventDefault()

    //metodo responsavel por gravar um dev
    const response = await api.post('/devs', { username })

    const { _id } = response.data
    console.log(response)

    //props padrão das routes que faz direcionamento
    history.push(`/dev/${_id}`)
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="TinDev" />
        <input placeholder="Informe seu usuário no Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}


export default Login

