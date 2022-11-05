require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true},(err)=>{
    if(err){console.log(err);}
    else{console.log("MongoDB Connected!");}
    
});


const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

app.get("/register",(req,res)=>{
    res.send("Hello World");
});

app.get("/login",(req,res)=>{
    res.send("Hello World");
});


app.post("/register", function(req,res){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
        newUser.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                res.render("studentDashboard")
            }
        });
    });
});

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if(result===true){
                        res.render("studentdashboard");
                    }
                });
            }
        }
    });
});















app.listen(process.env.PORT,()=>{console.log("Server is up");});