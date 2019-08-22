//facilia trabalhar com APIs externas
const axios = require('axios')
const Dev = require('../models/Devs')

module.exports = {

  async index(req, res) {
    const { user } = req.headers

    const loggedDev = await Dev.findById(user)

    //$ne = not equals
    //$and = operador and
    //%nin = not in
    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    })

    return res.json(users)
  },

  async store(req, res) {

    const { username } = req.body

    //verifica se usuario ja existe
    const userExists = await Dev.findOne({ user: username })
    if (userExists) {
      return res.json(userExists)
    }

    const response = await axios.get(`https://api.github.com/users/${username}`)

    //desestruturar o json
    const { name, bio, avatar_url: avatar } = response.data

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    })

    return res.json(dev)
  }
}