import express from 'express'
import { isAdmin } from '../../../middleware/ProtectedRouter.js'

import { Authorization } from '../../../middleware/Authorisation.js'
import { AddKitchen, DeleteKitchen, GetAllKitchens, UpdateKitchen } from './kitchenController.js'


const router=express.Router()
router.use(Authorization)
router.post('/add',isAdmin,AddKitchen)
router.get('/all',isAdmin,GetAllKitchens)
router.put('/update/:id',isAdmin,UpdateKitchen)
router.delete('/delete/:id',isAdmin,DeleteKitchen)



export default router