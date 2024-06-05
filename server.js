import express from 'express'
import dotenv from 'dotenv'
import route from './routes/userRoute.js'
import mongoose from 'mongoose'


const app = express()

app.use(express.json())
dotenv.config()



const port = process.env.PORT
const mongodb_url = (process.env.MONGODB_URL)
// const password = process.env.PASSWORD

mongoose.connect(mongodb_url)
.then(()=>{
    console.log('Database connected successfully')
    app.listen(port, () => {
        console.log(`Server listening on port: ${port}!`)
    })
}).catch((error)=>{
    console.log('Connection Error', error)
})


app.use('/api/user', route)

//Try again










