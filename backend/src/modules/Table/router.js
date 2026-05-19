import express from 'express'
import { isAdmin } from '../../../middleware/ProtectedRouter.js'
import { AddFloor, AddTable, DeleteFloor, DeleteTable, GetAllFloors, GetAllTables, UpdateFloor, UpdateTable } from './TableController.js'
import { Authorization } from '../../../middleware/Authorisation.js'
import { DeleteById } from './TableService.js'

const router=express.Router()
router.use(Authorization)
router.post('/floor',isAdmin,AddFloor)
router.get('/floors',isAdmin,GetAllFloors)
router.put('/floor/:id',isAdmin,UpdateFloor)
router.delete('/floor/:id',isAdmin,DeleteFloor)
router.post('/table',isAdmin,AddTable)
router.get('/tables',isAdmin,GetAllTables)
router.put('/table/:id',isAdmin,UpdateTable)
router.delete('/table/:id',isAdmin,DeleteTable)


export default router