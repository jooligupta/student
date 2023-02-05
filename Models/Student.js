const mongoose = require('mongoose')
const StudentSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
lname: {
      type: String,
      required: true,
    },
    sname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
     
    },
    mnum: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirm_password: {
      type: String,
      required: true,
    },
    image:{
        public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
    },
  },
  { timestamps: true }
);
const StudentModel = mongoose.model("registration",StudentSchema);
module.exports = StudentModel;
