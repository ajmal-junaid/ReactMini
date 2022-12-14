const express = require("express");
const cors = require("cors")
require("./db/config");
const app = express();
const User = require('./db/User');
const Product = require("./db/Product")
const Jwt = require('jsonwebtoken')
const jwtKey = "brototype" //env field

app.use(express.json());
app.use(cors());

//verifyuser middleware
function verifyUser(req, res, next) {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(" ")[1];
        console.warn(token, "tokennnnn")
        Jwt.verify(token, jwtKey, (err, success) => {
            if (err) {
                res.send({ msg: 'Token is invalid' });
            } else {
                next()
            }   
        })
    } else {
        res.send({ msg: "send token" })
    }

}

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save()
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            console.log(err, "iam token err");
            res.send({ auth: "false", message: "something went wrong token err" })
        }
        console.log(token, "from tokennnnnnnnnnn");
        res.send({ auth: true, token: token })
    })
    //res.send(result)
    console.log(req.body, "opopo", result);
})

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        //find user  ,  
        //verify password,
        //if true create token
        //send token response
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: 86400 }, (err, token) => {
                if (err) {
                    console.log(err, "iam token err");
                    res.send({ auth: "false", message: "something went wrong token err" })
                }
                console.log(token, "from tokennnnnnnnnnn");
                res.send({ auth: true, token: token })
            })

        } else {
            res.send({ auth: "false", message: "no user found" })
        }
    } else {
        res.send({ auth: "false", message: "Invalid credentials" })
    }
    console.log(req.body, "outside of alll")
})

app.get("/get-products", verifyUser, async (req, res) => {
    let product = await Product.findOne()
    let result = await product.save()
    console.log("-----------", result);
    res.send(result)
})

app.post("/adminlogin", (req, res) => {
    console.log(req.body, "kkkkkkkkkkk");
    if (req.body.username == "admin" && req.body.password == "12345") {
        res.send({ admin: true })
    } else {
        res.send("invalid credentials")
    }
})

app.get("/getusers", async (req, res) => {
    const user = await User.find().select("-password")
    console.log(user, "userssssss");
    if (user.length > 0) {
        res.send(user)
    } else {
        res.send({ result: "No Users Found" })
    }
})

app.delete("/deleteuser/:id", async (req, res) => {
    let result = await User.deleteOne({ _id: req.params.id })
    res.send(result)
})

app.get("/adminupdate/:id", async (req, res) => {
    let result = await User.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ "result": "No Records Found" })
    }
})

app.put("/adminupdate/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
})

app.get("/adminsearch/:key", async (req, res) => {
    let result = await User.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                email: { $regex: req.params.key }
            }
        ]
    });
    res.send(result);
})

app.listen(3000);