import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import { connectDB } from './config/db.js'
import branchRouter from './src/modules/branch/router.js'
import  UserRouter  from './src/modules/User/router.js'
import cookieParser from 'cookie-parser'

const app=express()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json())
const PORT=process.env.PORT
await connectDB()
app.use(cookieParser())
app.use('/branch',branchRouter)
app.use('/user',UserRouter)
    

app.listen(PORT,()=>{
    console.log(`server running on prot ${PORT}`)
})
