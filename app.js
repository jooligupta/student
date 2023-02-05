const express = require("express");
const app = express();
const port = 4000;
const connectDB = require('./db/connectDB')
const bodyParser=require('body-parser')
const fileUpload = require("express-fileupload");
var session=require("express-session");
var flash=require('connect-flash');
const cookieParser=require('cookie-parser')

/*- routing link----*/
const web = require("./routes/web.js");
/*link static file*/
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
//session message
app.use(session({
  secret:'secret',
  cookie:{maxAge:6000},
  resave:false,
  saveUninitialized:false,
}))
// flash message
app.use(flash())
//file upload
app.use(fileUpload({useTempFiles: true}));
//student controller link

//router load
app.use("/", web);
connectDB();

/*----------server create-------*/
/* ----setup ejs-----------*/
app.set('view engine','ejs')
app.listen(port, () => {
  console.log(`Server is started on localhost: ${port}`);
});
