const { Router } = require('express')
const articlesRoutes = Router()

const ArticlesController = require('../controller/ArticlesController')
const articlesController = new ArticlesController
const CommentsController = require('../controller/CommentsController')
const commentsController = new CommentsController

const AuthArticles = require('../middleware/AuthArticles')
const authArticles = new AuthArticles


articlesRoutes.post('/articles/create', authArticles.verifyUsers, authArticles.authCreate, articlesController.create)
articlesRoutes.delete('/articles/delete', authArticles.verifyUsers,  articlesController.delete)
articlesRoutes.get('/articles/show',  authArticles.verifyUsers, articlesController.show)
articlesRoutes.get('/articles/show-all', authArticles.verifyUsers, articlesController.index)

articlesRoutes.post('/articles/create-comments', commentsController.create)
articlesRoutes.delete('/articles/delete-comments', commentsController.delete)
articlesRoutes.get('/articles/comments', commentsController.index)


module.exports = articlesRoutes