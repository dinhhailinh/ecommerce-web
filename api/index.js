const express = require ('express')
const cors =require ('cors')
const env = require('dotenv')
const path = require('path')
const routerIndex = require ('./router/index')
const PORT = process.env.PORT || 5000

const app = express()
env.config()

app.use(cors())
app.use(express.json())

app.use('/api', routerIndex)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
