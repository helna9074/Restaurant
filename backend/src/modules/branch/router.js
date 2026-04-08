import express from 'express'
import { AddBranch, AddCustomer, AddPayment, DeleteBranch, DeleteCustomer, DeletePayment, GetBranches, GetCustomers, GetPayments, getupdateBranch, updateBranch, UpdateCustomer, UpdatePayment } from './branchController.js'
import upload from '../../../middleware/upload.js'
import { Authorization } from '../../../middleware/Authorisation.js'
import { isAdmin } from '../../../middleware/ProtectedRouter.js'

const router=express.Router()
router.put('/payment',UpdatePayment)
router.delete('/payment',DeletePayment)
router.use(Authorization)
router.get('/branches',GetBranches)
router.get('/customers',GetCustomers)

router.get('/allbranches/:id',isAdmin,getupdateBranch)
router.post('/add',isAdmin,upload.single('logo'), AddBranch)
router.put('/update/:id',isAdmin,upload.single('logo'),updateBranch)
router.delete('/delete/:id',isAdmin,DeleteBranch)
router.post('/customer',isAdmin,AddCustomer)

router.put('/customer',isAdmin,UpdateCustomer),
router.delete('/customer',isAdmin,DeleteCustomer)

router.post('/payment',isAdmin,AddPayment)
router.get('/payments',isAdmin,GetPayments)

export default router