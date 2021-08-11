const express = require('express');
require("./dbConnection/dbConnection")

const app = express()
const studentRouter = require('./routers')
const port = process.env.PORT || 3000

app.use(express.json())  // middleware use to recongize the incoming request object as json
app.use(studentRouter)

app.listen(port, () => {
    console.log(`Listensing on port ${port}`)
})

// 204 status code indicate successful operation it don't contains res.send body/no-content