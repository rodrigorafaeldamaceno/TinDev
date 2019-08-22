/*
    gerencia as rotas da aplicação e os metodos http
*/
const express = require('express')
const routes = express.Router()
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

//metodo get na rota raiz
routes.get('/', (req, res) => {
  //req.query contem todos os parametros enviados na rota
  let nome = req.query.name
  return res.json({ message: `Hello ${nome}` })
})

//resposavel por buscar um dev
routes.post('/devs', DevController.store)

//lista os devs não vistos ainda
routes.get('/devs', DevController.index)

//responsavel pelos likes e diskes
routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/dislikes', DislikeController.store)


//exportando a const routes
module.exports = routes