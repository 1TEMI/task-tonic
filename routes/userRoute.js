import  express from 'express'
import { fetch, update, deleteUser } from '../controller/userController.js'
import { signup, login }  from '../controller/authController.js'
import {checkAndRenewToken}  from '../middleware/validateToken.js'
// import { validateToken } from '../controller/authController.js'


const userRoute = express.Router()

userRoute.post('/auth/signup', signup)
userRoute.post('/auth/login', login)
userRoute.get('/getAllUsers',checkAndRenewToken, fetch)
userRoute.put('/update/:id',checkAndRenewToken, update)
userRoute.delete('/delete/:id', deleteUser)
// userRoute.get('/validateToken', checkAndRenewToken, validateToken)

export default userRoute

