const { Router } = require('express')
const adminRoutes = Router()

const AdminController = require('../controller/AdminController')
const adminController = new AdminController

adminRoutes.delete("/admin/delete-articles", adminController)
adminRoutes.delete("/admin/delete-comments", adminController)
adminRoutes.delete("/admin/delete-users", adminController)
adminRoutes.put("/admin/change-hierarchy", adminController)

module.exports = adminRoutes