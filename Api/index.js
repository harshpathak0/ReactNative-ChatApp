const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
const User = require("./models/user")
const Message = require("./models/message");

const app = express();
const cors = require("cors")
app.use(cors({
    origin: ["http://localhost:8081"],
    methods: ["GET", "PATCH", "PUT", "DELETE", "POST"],
    credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
const jwt = require("jsonwebtoken")

mongoose.connect(
    "mongodb+srv://pathakharsh9644:" + encodeURIComponent("Harsh@123") + "@cluster0.yptog0p.mongodb.net/ChatApp",
    // 'mongodb://127.0.0.1:27017/ChatApp'
)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error Connecting to MongoDB", err);
    });



//endPoint for registration of the user

app.post("/register", async(req, res) => {
    const { name, email, password, image } = req.body;

    const oldUser = await User.findOne({email: email});
    if(oldUser) {
        return res.send({message: "User already exists!!"})
    }
    //create a new user object
    // const newUser = new User({ name, email, password, image })
    //save the user to the databases
    // newUser.save()
    // bcrypt.hash(password, 10)
    try{
        await User.create({ 
            name: name, 
            email: email,
            password,
            image 
          });
        res.status(200).json({ message: "User registered Successfully" });
    }    
    catch(error){
            console.log("Error registering user", err)
            res.status(500).json({ message: "Error in registering the user" });
        };
});


//function to create a token for the user
const createToken = (userId) => {
    //set the token payload
    const payload ={
        userId : userId,
    };

    //generate the token with a secret key and expiration time
    const token = jwt.sign(payload, "QJjduywhdjuw891HJ", {expiresIn : "1d"});
    return token;
}

//endPoints for logging in of that particular user;
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    //check if the email & password provided
    if (!email || !password) {
        return res.status(404).json({ message: "Email and password are required" })
    }

    //check for that user in the database
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "user not found" })
            }
            if (user.password !== password) {
                return res.status(404).json({ message: "Invalid Password" })
            }

            const token = createToken(user._id);
            res.status(200).json({ token })
        }).catch(
            (error) => {
                console.log("error in finding the user", error);
                res.status(500).json({ message: "internal server error" })
            }
        )
})

//endpoint to access all the users accepts the user who's is currently logged in!
app.get("/users/:userId", (req, res) => {
    const loggedInUserId = req.params.userId;

    User.find({_id:{$ne:loggedInUserId}})
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((err) => {
        console.log("Error retrieving users", err);
        res.status(500).json({message:"Error retrieving users"})
    })
    
});

const port = 8000;
app.listen(port, () => {
    console.log("Server running on the port 8000")
});