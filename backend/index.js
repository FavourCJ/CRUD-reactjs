const express = require ("express");
const mysql = require ("mysql");
const cors = require ("cors");
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const bodyParser = require("body-parser");
const saltRounds = 10
const app = express ();
app.use(express.json())

app.use(
    cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
    key: "userID",
    secret: "current-user-account",
    resave: false,
    saveUninitialized:false,
    cookie:{
        expires: 60 * 60 * 24,
    },
}))

//connecting to the database
const db = mysql.createConnection ({
    user: "root",
    host: "localhost",
    password: "password",
    database: "database"

})

//creating an api end point
//Inserting data to our database
app.post("/create", (req, result)=>{
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;

    //hashing user's password
    bcrypt.hash(password, saltRounds,(err, hash) =>{
        if (err){
            console.log(err)
        }

        db.query("INSERT INTO user (fullname, email, password) VALUES (?,?,?)",
        [fullname, email, hash], 
        (err, res) =>{
            if(err) 
            {
                console.log (err);
            } else{
                result.send("Values Inserted into user table");
            }
    
        });
    })
    
  
});

app.get ("/login", (req, res) =>{
    if(req.session.user){
        res.send({
            loggedIn: true,
            user: req.session.user
        })
    }else{
        res.send({loggedIn: false})
    }
});

 //deleting user from database
 app.delete("/delete/:email", (req, res) =>{
    const email = req.params.email;
    db.query ("DELETE FROM user WHERE email = ?", email, (err, result) => {
    if(err){
        console.log(err);
    }else {
        res.send(result);
    }
    })
});

//update user's profile
app.put("/update", (req, res) =>{
    const email = req.body.email;
    const fullname = req.body.fullname;
    db.query("UPDATE user SET fullname = ? where email = ?",
    [fullname, email], (err, res) =>{
        if(err){
            console.log(err);
        }else{
            res.send(res);
        }
    })
})

//log user
app.post("/login", (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM user WHERE email =?",
    email,
    (err, result) =>{
        if(err){
            res.send({err: err});
        }
        if(result.length>0){
            bcrypt.compare(password, result[0].password, (error, response)=>{
                if(response){
                    req.session.user = result;
                    res.send(result);
                }else{
                    res.send({message: "Wrong email/password combination"});
                }
            })
        }else{
            res.send({message: "User does not exist"});
        }
    })
})

   //retrieving users from user table
    app.get("/getUser", (req, res) =>{
        db.query("SELECT * FROM user", (err, result)=> {
            if(err){
                console.log(err);
            }else {
                res.send(result);
            }
        })
    });

    app.listen(3005, () =>{
        console.log("Yah!! server is running on port 3005");
    });