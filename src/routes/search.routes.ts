import { Router } from "express"
import SearchController from "../controller/SearchController"

const searchRoutes = Router()

const searchController = new SearchController

searchRoutes.get('/', searchController.index)



module.exports = searchRoutes