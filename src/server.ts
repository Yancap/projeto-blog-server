import { NextFunction, Request, Response } from "express"
import express from "express"
import AppError from "./utils/AppError"
import routes from "./routes"
require("express-async-errors")

const cors = require('cors')

const app = express()


app.use(cors())
app.use(express.json({limit: '5mb'}))
app.use(routes)
app.use((error: typeof AppError | any, request: Request, response: Response, next: NextFunction) => {
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