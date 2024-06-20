import express from 'express'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())
dotenv.config()

const port = process.env.PORT
const db = (process.env.MONGODB_URL)
// const password = process.env.PASSWORD

mongoose.connect(db)
.then(()=>{
    console.log('Database connected successfully')
    app.listen(port, () => {
        console.log(`Server listening on port: ${port}!`)
    })
}).catch((error)=>{
    console.log('Connection Error', error)
})


app.use('/api/user', userRoute)

//Try again










