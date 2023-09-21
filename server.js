const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
let app = express();


const url="mongodb+srv://mohit:123@contact.9lneko2.mongodb.net/?retryWrites=true&w=majority";
// const url="mongodb+srv://mohit:1234@contacttwo.qr7odyo.mongodb.net/?retryWrites=true&w=majority";
async function ConnectDB(){
    try{
      await mongoose.connect(url);
      console.log("Database in connected...");
    }catch(error){
        console.log(error);
      console.log("Error while connecting database...");
    }
  }
  ConnectDB();
  const contactSchema = {
    name:String,
    email: String,
    query: String,
  };
    
  const Contact = mongoose.model("Contact", contactSchema);
    

  app.set("view engine", "ejs");
    
  app.use(bodyParser.urlencoded({
      extended: true
  }));
    
  app.get("/contact", function(req, res){
      res.render("contact");
  });

app.post("/Contact", async function (req, res) {
  const name=req.body.name;
  const email=req.body.email;
  const query=req.body.query;
    try{
      await Contact.create({
          name : name,
          email : email ,
          query: query
      })
      res.send("Stored successfully");
  }
  catch(err){
      console.log(err);
  }
});


const loginSchema = {
  email: String,
  password: String,
};
  
const Login = mongoose.model("login", loginSchema);
app.post("/login", async function (req, res) {
  const email=req.body.email;
  const password=req.body.password;
    try{
      await Login.create({
          email : email ,
          password : password
      })
      res.render('index')
  }
  catch(err){
      console.log(err);
  }
});
const signupSchema = {
  email: String,
  password: String,
};
  
const SignupSchema = mongoose.model("signup", signupSchema);
app.post("/signup", async function (req, res) {
  const email=req.body.email;
  const password=req.body.password;
    try{
      await SignupSchema.create({
          email : email ,
          password : password
      })
      res.render('login');
  }
  catch(err){
      console.log(err);
  }
});


const port = 3000;
app.use(express.static(path.join(__dirname,'views')))
app.set("view engine", "ejs");

app.get('/',(req,res)=>{
  res.render('index')
})
app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/signup", function(req, res){
  res.render("signup");
});
app.get("/login", function(req, res){
  res.render("login");
});
app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});