import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import { connectDB } from './config/db.js'
import branchRouter from './src/modules/branch/router.js'
import  UserRouter  from './src/modules/User/router.js'
import DepartmentRouter from './src/modules/department/router.js'
import TableRouter from './src/modules/Table/router.js'
import MenuRouter from './src/modules/Menu/router.js'
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
app.use('/dpt',DepartmentRouter)
app.use('/t&f',TableRouter)
app.use('/menu',MenuRouter)

    

app.listen(PORT,()=>{
    console.log(`server running on prot ${PORT}`)
})
