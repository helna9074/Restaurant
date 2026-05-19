import express from 'express'
import upload from '../../../middleware/upload.js'
import { isAdmin } from '../../../middleware/ProtectedRouter.js'
import { AddCategory, AddMenu, DeleteCategory, DeleteMenu, GetCategories, GetMenus, UpdateCategory, UpdateMenu } from './Controller.js'
import { Authorization } from '../../../middleware/Authorisation.js'


const router=express.Router()

router.use(Authorization)
router.post('/category',upload.single('img'),isAdmin,AddCategory)
router.get('/categories',isAdmin,GetCategories)
router.delete('/category/:id',isAdmin,DeleteCategory)
router.put('/category/:id',upload.single('img'),isAdmin,UpdateCategory)
router.post('/add',isAdmin,AddMenu)
router.get('/all',isAdmin,GetMenus)
router.put('/update/:id',isAdmin,UpdateMenu)
router.delete('/delete/:id',isAdmin,DeleteMenu)

export default router