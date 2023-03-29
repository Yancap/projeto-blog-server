const { Router } = require('express')
const routes = Router()

const usersRoutes = require('./users.routes')
const articlesRoutes = require('./articles.routes')
const searchRoutes = require('./search.routes')
// const adminRoutes = require('./admin.routes')

routes.use('/users', usersRoutes)
routes.use('/articles', articlesRoutes)
routes.use('/search', searchRoutes)
// routes.use('/admin', adminRoutes)

module.exports = routes