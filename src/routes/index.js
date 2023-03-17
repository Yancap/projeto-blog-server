const { Router } = require('express')
const router = Router()

const usersRoutes = require('./users.routes')
const articlesRoutes = require('./articles.routes')
const searchRoutes = require('./search.routes')

router.use('/users', usersRoutes)
router.use('/articles', articlesRoutes)
router.use('/search', searchRoutes)

module.exports = routes