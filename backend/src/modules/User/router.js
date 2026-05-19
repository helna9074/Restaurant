import express from 'express'
import { DeleteUsers, GetMe, GetUsers, Login, SignAdmin, SignUser, UpdateUser } from './UserController.js'
import {Authorization} from '../../../middleware/Authorisation.js'
import { createUser } from './UserService.js'
import { isAdmin } from '../../../middleware/ProtectedRouter.js'
 const router=express.Router()
 router.post('/signup',SignAdmin)
router.post('/login',Login)
router.use(Authorization)
router.post('/create',isAdmin,SignUser)
router.get('/me',Authorization,GetMe)
router.get('/users',isAdmin,GetUsers)
router.put('/update',isAdmin,UpdateUser)
router.delete('/delete/:id',isAdmin,DeleteUsers)

export default router