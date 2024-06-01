const User=require("./models/User")
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
const PORT = 3003;

app.use(express.json());

const dbConnection = () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://aishwaryachordia20:symbi207@cluster0.ysl43wk.mongodb.net/aa_shoppingwebsite?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then(console.log("DB Connected successfully"));
  } catch (e) {
    console.log(e);
  }
};

dbConnection();

app.post("/register", async(req, res) => {
  console.log(req.body);
  const { name, role, email, password, address } = req.body;
  try {
      //finding the user in db
      const existingUser=await User.find({email:email}
      )
      console.log(existingUser)
      if(existingUser.length>0){
        res.send({message:"User already exists"})
      }
      else{
        bcrypt
        .genSalt(saltRounds)
        .then((salt) => {
          return bcrypt.hash(password, salt);
        })
        .then((hash) => {
          console.log("Hash: ", hash);
          const user=new User(
            {
              name:name,
              role:role,
              email:email,
              password:hash,
              address:address
            }
          )
          user.save().then((result)=>{        //callback function is executed after main function has been executed
            res.send({message:"User added"})
          })
          .catch((message)=>{
            console.log(message)
            res.send({message:message})
          })
        })
        .catch((err) => {
          res.send({message:err})
        });
      }
  } catch (e) {
    res.send({ message: e });
  }
});

app.post("/login", async(req, res) => {
  const { email, password } = req.body;
  try{
    const existingUserEmail=await User.find({email:email})
    console.log(existingUserEmail)
    if(existingUserEmail.length>0){
      const result=await bcrypt.compare(password,existingUserEmail[0].password)
      if(result){
        res.send({message:"User logged in successfully"})
      }
      else{
        res.send({message:"User log in failed"})
      }
    }
    else{
      res.send({message:"User with the entered does not exist"})
    }
  }
  catch(e){
    res.send({message:e})
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
