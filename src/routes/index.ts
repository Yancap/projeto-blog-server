import { Router } from "express"
import articlesRoutes from "./articles.routes"
import commentsRoutes from "./comments.routes"
import usersRoutes from "./users.routes"

const routes = Router()

const searchRoutes = require('./search.routes')
// const adminRoutes = require('./admin.routes')

routes.use('/users', usersRoutes)
routes.use('/comments', commentsRoutes)
routes.use('/articles', articlesRoutes)
routes.use('/search', searchRoutes)
// routes.use('/admin', adminRoutes)

export default routes