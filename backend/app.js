const express= require('express')
const app=express()
require('dotenv').config()
require('./db/connection')

const cors= require('cors')
app.use(express.json())

const courseRoutes = require('./routes/courseRoutes')
app.use(cors());
app.use('/course',courseRoutes);

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
console.log(`server running on port ${PORT}`)
})