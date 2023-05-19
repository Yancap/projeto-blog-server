import { Router } from "express"
import UsersController from "../controller/UsersController"
import authToken from "../middleware/authToken"

const usersRoutes = Router()
const usersController = new UsersController

usersRoutes.post('/login', authToken, usersController.login)
usersRoutes.post('/register', usersController.create)
usersRoutes.put('/avatar', authToken, usersController.update)
usersRoutes.put('/change-password', authToken, usersController.update)
usersRoutes.get('/author', usersController.getAuthor)

export default usersRoutes