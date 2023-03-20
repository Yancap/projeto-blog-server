const { Router } = require('express')
const articlesRoutes = Router()

const ArticlesController = require('../controller/ArticlesController')
const articlesController = new ArticlesController
const CommentsController = require('../controller/CommentsController')
const commentsController = new CommentsController

articlesRoutes.post('/articles/create', articlesController.create)
articlesRoutes.delete('/articles/delete', articlesController.delete)
articlesRoutes.get('/articles/show', articlesController.show)
articlesRoutes.get('/articles/show-all', articlesController.index)

articlesRoutes.post('/articles/create-comments', commentsController.create)
articlesRoutes.delete('/articles/delete-comments', commentsController.delete)
articlesRoutes.get('/articles/comments', commentsController.index)


module.exports = articlesRoutes