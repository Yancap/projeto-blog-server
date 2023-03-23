const { Router } = require('express')
const articlesRoutes = Router()

const ArticlesController = require('../controller/ArticlesController')
const articlesController = new ArticlesController
const CommentsController = require('../controller/CommentsController')
const commentsController = new CommentsController

const AuthArticles = require('../middleware/AuthArticles')
const authArticles = new AuthArticles


articlesRoutes.post('/create', authArticles.verifyUsers, authArticles.authCreate, articlesController.create)
articlesRoutes.delete('/delete', authArticles.verifyUsers, authArticles.authDelete,   articlesController.delete)
// articlesRoutes.get('/show',  authArticles.verifyUsers, articlesController.show)
articlesRoutes.get('/show-all', articlesController.index)

// articlesRoutes.post('/create-comments', commentsController.create)
// articlesRoutes.delete('/delete-comments', commentsController.delete)
// articlesRoutes.get('/comments', commentsController.index)


module.exports = articlesRoutes