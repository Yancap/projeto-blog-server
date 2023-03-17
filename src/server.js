require("express-async-errors")
const express = require('express')


const app = express()
const routes = require('./routes')

app.use(express.json())

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server is Running"))