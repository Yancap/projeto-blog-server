const { Router } = require('express')
const searchRoutes = Router()

const SearchController = require('../controller/SearchController')
const searchController = new SearchController

searchRoutes.get('/', searchController.index)



module.exports = searchRoutes