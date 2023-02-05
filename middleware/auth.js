const StudentModel=require('../Models/Student')
const jwt=require('jsonwebtoken');
const Auth=async(req,res,next)=>{
    try{
const token=req.cookies.jwt
console.log(token)
const verifystudent=jwt.verify(token,'jooligupta54321')
//console.log(verifystudent)
const student=await StudentModel.findOne({_id:verifystudent.studentId})
console.log(student)
req.data=student;
next()
    }
    catch(err){
       // console.log(err)
        //res.redirect('/Login')
    }
}
module.exports=Auth;