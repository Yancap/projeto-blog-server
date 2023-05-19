import { Router } from "express"
import ArticlesController from "../controller/ArticlesController"
import authToken from "../middleware/authToken"
import checkUsersIsLogged from "../middleware/checkUsersIsLogged"

const articlesRoutes = Router()
const articlesController = new ArticlesController

articlesRoutes.post('/create', authToken, checkUsersIsLogged, articlesController.create)
articlesRoutes.put('/update', authToken, checkUsersIsLogged, articlesController.update)
articlesRoutes.delete('/delete', authToken, checkUsersIsLogged,  articlesController.delete)
articlesRoutes.get('/show',  articlesController.show)
articlesRoutes.get('/show/user', authToken, articlesController.show)
articlesRoutes.get('/show-all', articlesController.index)

export default articlesRoutes