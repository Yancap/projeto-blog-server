const { Router } = require('express')
const articlesRoutes = Router()

const ArticlesController = require('../controller/ArticlesController')
const articlesController = new ArticlesController
const CommentsController = require('../controller/CommentsController')
const commentsController = new CommentsController

const AuthArticles = require('../middleware/AuthArticles')
const authArticles = new AuthArticles
const AuthComments = require('../middleware/AuthComments')
const authComments = new AuthComments

articlesRoutes.post('/create', authArticles.verifyUsers, authArticles.authCreate, articlesController.create)
articlesRoutes.delete('/delete', authArticles.verifyUsers, authArticles.authDelete,  articlesController.delete)
articlesRoutes.put('/update', authArticles.verifyUsers, authArticles.authCreate,  articlesController.update)
articlesRoutes.get('/show', articlesController.show)
articlesRoutes.get('/show-all', articlesController.index)

articlesRoutes.post('/create-comments', authComments.verify, commentsController.create)
articlesRoutes.delete('/delete-comments', authComments.verify, commentsController.delete)
articlesRoutes.get('/comments', commentsController.index)


module.exports = articlesRoutes