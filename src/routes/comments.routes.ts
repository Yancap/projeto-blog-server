import { Router } from "express"
import CommentsController from "../controller/CommentsController"
import authToken from "../middleware/authToken"

const commentsRoutes = Router()

const commentsController = new CommentsController


commentsRoutes.post('/create', authToken, commentsController.create)
commentsRoutes.delete('/delete', authToken, commentsController.delete)
commentsRoutes.get('/all', commentsController.index)
commentsRoutes.get('/show', commentsController.show)
commentsRoutes.get('/show/user', authToken, commentsController.show)


export default commentsRoutes