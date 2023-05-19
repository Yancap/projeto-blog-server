import { Router } from "express"
import usersRoutes from "./users.routes"

const routes = Router()

const articlesRoutes = require('./articles.routes')
const searchRoutes = require('./search.routes')
// const adminRoutes = require('./admin.routes')

routes.use('/users', usersRoutes)
routes.use('/articles', articlesRoutes)
routes.use('/search', searchRoutes)
// routes.use('/admin', adminRoutes)

export default routes