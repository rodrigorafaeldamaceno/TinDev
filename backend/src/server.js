/*
    servidor da aplicação
*/
//quando chamado cria um novo servidor
const express = require('express')

//mongoose possibilita escrever sintaxe de sgbd em javascript
const mongoose = require("mongoose")

//permite que o backend seja acessado
const cors = require('cors')

const routes = require('./routes')
const server = express()

//conectando ao sgbd
mongoose.connect('mongodb+srv://rsouza:rsouza123@tindevcluster-gxzea.mongodb.net/tinDev?retryWrites=true&w=majority',
  { useNewUrlParser: true }
)


server.use(cors())

//informando ao servidor que as requisições serão em json
server.use(express.json())

//pegando as rotas
server.use(routes)

//iniciando o servidor na porta 3333
server.listen(3333)