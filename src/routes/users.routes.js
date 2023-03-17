const { Router } = require('express')
const usersRoutes = Router()

const UsersController = require('../controller/UsersController')
const usersController = new UsersController



module.exports = usersRoutes