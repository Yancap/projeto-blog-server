const { Router } = require('express')
const routes = Router()

const usersRoutes = require('./users.routes')
// const articlesRoutes = require('./articles.routes')
// const searchRoutes = require('./search.routes')
// const adminRoutes = require('./admin.routes')

routes.use('/users', usersRoutes)
// router.use('/articles', articlesRoutes)
// router.use('/search', searchRoutes)
// router.use('/admin', adminRoutes)

module.exports = routes