const StudentModel = require("../../Models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cloudinary=require("cloudinary").v2;
cloudinary.config({
cloud_name:'dvodnqfjc',
api_key:'176388497429298',
api_secret:'WYd-P4QbMvMUScyxL0lM4iLg6GE',
//secure:true
})
class StudentController {
  static registerinsert = async (req, res) => {
    const file = req.files.image
    const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
        folder : 'StudentImage'
    })
    console.log(myCloud)
    const { fname,lname,sname, email,mnum, password, confirm_password } = req.body;
    const student = await StudentModel.findOne({ email: email });
    if (student) {
      req.flash("error", "Email already Exit!..");
      res.redirect("/admin/Registration");
    } else {
      if (fname && lname && sname && email && mnum && password && confirm_password) {
        if (password == confirm_password) {
          try {


            //const salt=await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, 10);
            const data = new StudentModel({
             fname:fname,
             lname:lname,
             sname:sname,
              email: email,
              mnum:mnum,
              password: hashPassword,
              confirm_password: confirm_password,
              image:{
                public_id:myCloud.public_id,
                   url:myCloud.secure_url,
                },
            });
            const datasaved = await data.save();
            if (datasaved) {
              req.flash(
                "successMsg",
                "Registration Successful,Please again!.."
              );
              res.redirect("/admin/Login");
            } else {
              res.redirect("/admin/Registration");
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          req.flash("error", "Password and ConPassword does not Match!..");
          res.redirect("/admin/Registration");
        }
      } else {
        req.flash("error", "All Field are registered!..");
        res.redirect("/admin/Registration");
      }
    }
  }
    static register=async(req,res)=>{
try{
res.render('admin/Registration',{ message: req.flash("error") })
}
catch(err){
  console.log(err)
}
    }
    static login = async (req, res) => {
      try {
        res.render("admin/Login", {
          successMessage: req.flash("successMsg"),
          errMsg: req.flash("error"),
        });
      } catch (err) {
        res.render(err);
      }
    };
    static verifyLogin=async(req,res)=>{
      try{
    // console.log(req.body)
    const{email,password}=req.body;
    if(email && password){
  const student=await StudentModel.findOne({email:email}) 
  console.log(student)
  if(student!=null){
    const isMatched = await bcrypt.compare(password, student.password);
    if(student.email===email && isMatched){
 //generate jwt token
 var token = jwt.sign({ studentId: student._id }, "jooligupta54321");
 console.log(token);
 res.cookie('jwt',token)
 res.redirect("/admin/dashboard");
    }
    else{
      req.flash("error", "Email and Password does not match!...");
      res.redirect("/admin/Login");
    }
  }
  else{
    req.flash("error", "you are not register user!..");
      res.redirect("/admin/Login");
  }
    }
    else{
      req.flash("error", "All Field are registered!..");
      res.redirect("/admin/Login");
    }
      }catch(err)
      {
        console.log(err)
      }
    }
    static logout=async(req,res)=>{
      try{
        res.clearCookie('jwt')
res.render('/')
      }
      catch(err){
        console.log(err)
      }
    }
  }

module.exports=StudentController;