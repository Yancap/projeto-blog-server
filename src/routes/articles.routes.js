const { Router } = require('express')
const articlesRoutes = Router()

const ArticlesController = require('../controller/ArticlesController')
const articlesController = new ArticlesController

module.exports = articlesRoutes