import express from 'express'
import upload from '../../../middleware/upload.js'
import { isAdmin } from '../../../middleware/ProtectedRouter.js'
import { AddCategory, AddMenu, CreateAddOn, CreateFood, DeleteAddOn, DeleteCategory, DeleteFood, DeleteMenu, GetAddOns, GetCategories, GetFoods, GetMenus, UpdateAddOn, UpdateCategory, UpdateFood, UpdateMenu, ViewFood } from './Controller.js'
import { Authorization } from '../../../middleware/Authorisation.js'
import { AddAddOn } from './ServiceController.js'


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
router.post('/addOn',isAdmin,CreateAddOn)
router.get('/addOns',isAdmin,GetAddOns)
router.put('/addOn/:id',isAdmin,UpdateAddOn)
router.delete('/addOn/:id',isAdmin,DeleteAddOn)
router.post('/food',upload.single('img'),isAdmin,CreateFood)
router.put('/food/:id',upload.single('img'),isAdmin,UpdateFood)
router.get('/foods',isAdmin,GetFoods)
router.get('/food/:id',isAdmin,ViewFood)
router.delete('/food/:id',isAdmin,DeleteFood)


export default router