const { Router } = require('express')
const searchRoutes = Router()

const SearchController = require('../controller/SearchController')
const searchController = new SearchController

searchRoutes.get('/search/:q', SearchController.index)



module.exports = searchRoutes