const express = require('express')
const cors = require('cors')
require('dotenv').config()
const sequelize = require('./db')
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.send('Server is running in the backend')
    console.log('Server is running in the backend')
})

const PORT = process.env.PORT || 5000 
app.listen(PORT,()=>{
    console.log(`server is running in http://localhost:${PORT}`)
})