import express from 'express'
import { AddDepartments, AddEmployee, AddPosition, DeleteDpt, DeleteEmployee, DeletePosition, GetDpts, GetEmployees, GetEmply, GetPositions, UpdateDpt, UpdateEmployee, UpdatePosition } from "./departmentController.js"
import { Authorization } from '../../../middleware/Authorisation.js'
import { isAdmin } from '../../../middleware/ProtectedRouter.js'


const router=express.Router()

router.use(Authorization)
router.post("/add",isAdmin,AddDepartments)

router.put("/update",isAdmin,UpdateDpt)
router.delete("/delete/:id",isAdmin,DeleteDpt)
router.get("/alldpt",isAdmin,GetDpts)
router.get("/pos",isAdmin,GetPositions)
router.post("/pos",isAdmin,AddPosition)


router.put("/pos",isAdmin,UpdatePosition)
router.delete("/pos/:id",isAdmin,DeletePosition)
router.post("/emp",isAdmin,AddEmployee)
router.get("/emp",isAdmin,GetEmployees)
router.get("/emp/:id",isAdmin,GetEmply)
router.put("/emp/:id",isAdmin,UpdateEmployee)
router.delete("/emp/:id",isAdmin,DeleteEmployee)
export default router