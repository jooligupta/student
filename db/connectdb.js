const mongoose=require('mongoose')

const connectDB = ()=>{
    return mongoose.connect('mongodb://127.0.0.1:27017/ApiRegistration')
    .then(()=>{
        console.log('connected successfully!...')
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=connectDB;