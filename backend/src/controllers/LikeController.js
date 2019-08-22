/*
    Controller responsavel por gerenciar os likes dos devs

    Por questões de boas praticas de desenvolvimento de APIs em MVC
    não se deve criar metodos que fujam dos 5 fundamentais:
        Index: Faz uma lista daquele recurso
        Show: retorna um unico daquele recurso
        Store: Cria os recursos na base
        Update: Atualiza um registro
        Delete: Deleta um registro
    Por isso é interessante se criar outro controller caso necessite-se
    é bom criar outro controller
*/

const Dev = require('../models/Devs')

module.exports = ({
  async store(req, res) {

    //console.log('user atual: ', req.headers.user)
    //console.log('user like', req.params.devId)


    const { user } = req.headers
    const { devId } = req.params

    const loggedDev = await Dev.findById(user)
    const targetDev = await Dev.findById(devId)

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' })
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      console.log('Deu match')
    }

    loggedDev.likes.push(targetDev._id)

    await loggedDev.save()
    return res.json(loggedDev);

  }
})