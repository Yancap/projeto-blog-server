require("express-async-errors")
const express = require('express')
const cors = require('cors')

const app = express()
const routes = require('./routes')
const AppError = require("./utils/AppError")

app.use(cors())
app.use(express.json({limit: '5mb'}))
app.use(routes)
app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.status).json({
            status: "error",
            message: error.message,
            typeError: error.typeError
        })
    } 

    console.error(error)
    return response.status(500).json({
        status: "error",
        message: "erro do servidor",
    })
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server is Running:", PORT))