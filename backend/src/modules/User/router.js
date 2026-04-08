import express from 'express'
import { GetMe, LoginUser, SignAdmin } from './UserController.js'
import {Authorization} from '../../../middleware/Authorisation.js'
 const router=express.Router()
 router.post('/signup',SignAdmin)
router.post('/login',LoginUser)
router.get('/me',Authorization,GetMe)

export default router