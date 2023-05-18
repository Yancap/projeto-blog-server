const { Router } = require('express')
const usersRoutes = Router()

const UsersController = require('../controller/UsersController')
const usersController = new UsersController
const AuthUsers = require("../middleware/AuthUsers")
const authToken = require('../middleware/authToken')
const authUsers = new AuthUsers

usersRoutes.post('/login', authToken, usersController.show)
usersRoutes.post('/register', authUsers.authRegister, usersController.create)
usersRoutes.put('/avatar', authUsers.authToken, usersController.update)
usersRoutes.put('/change-password', authUsers.authToken, authUsers.authUpdate, usersController.update)
usersRoutes.get('/author', usersController.index)

module.exports = usersRoutes