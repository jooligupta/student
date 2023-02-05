class AdminController{
    static dashboard=async(req,res)=>{
        try{
     const{fname,lname,sname,email,mnum,image}=req.data
          res.render('admin/dashboard',{e:email,f:fname,l:lname,img:image})
        }
        catch(err){
            console.log(err)
        }
    }
}
module.exports=AdminController;