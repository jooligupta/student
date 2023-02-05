const express = require('express');
const StudentController = require('../Controller/Admin/StudentController');
const AdminController=require('../Controller/Admin/AdminController')
const router=express.Router();
const Auth=require('../middleware/auth.js')
/*---------AdminController-----*/
router.get('/admin/dashboard', Auth,AdminController.dashboard)
// Student Controller
router.get('/admin/register',StudentController.register)
router.post('/admin/registerinsert',StudentController.registerinsert)
router.get('/admin/Login',StudentController.login)
router.post('/verifyLogin',StudentController.verifyLogin)
router.get('/logout',StudentController.logout)
module.exports=router;