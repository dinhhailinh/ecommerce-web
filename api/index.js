const express = require ('express')
const cors =require ('cors')
const env = require('dotenv')
const routerIndex = require ('./router/index')
const PORT = process.env.PORT || 5000

const app = express()
env.config()

app.use(cors())
app.use(express.json())

app.use('/api', routerIndex)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))