const { Router } = require('express')
const searchRoutes = Router()

const SearchController = require('../controller/SearchController')
const searchController = new SearchController

module.exports = searchRoutes