const { Router } = require('express')
const usersRoutes = Router()

const UsersController = require('../controller/UsersController')

const usersController = new UsersController


usersRoutes.post('/login', usersController.show)
usersRoutes.post('/avatar', usersController.show)
usersRoutes.post('/register', usersController.create)
usersRoutes.put('/change-password', usersController.update)


module.exports = usersRoutes