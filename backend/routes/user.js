const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

// require("../db/config");
const User = require('../db/User');
const Product = require("../db/Product")
const Jwt = require('jsonwebtoken')
const jwtKey = "brototype" //env field

//verifyuser middleware
function verifyUser(req, res, next) {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(" ")[1];
        Jwt.verify(token, jwtKey, (err, success) => {
            if (err) {
                res.send({ msg: 'Token is invalid' });
            } else {
                next()
            }
        })
    } else {
        console.log(token, "tokkkkk");
        res.send({ msg: "send token" })
    }
}


router.post("/register", async (req, res) => {
    let IsUser = await User.findOne({ email: req.body.email })
    if (IsUser) {
        res.send({ message: `User Already Exists With this E-mail ${req.body.email}` })
    } else {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        console.log(req.body, "passsword hashed");
        let result = new User(req.body);
        let user = await result.save()
        user = user.toObject();
        delete user.password;
        Jwt.sign({ user }, jwtKey, { expiresIn: 86400 }, (err, token) => {
            if (err) {
                res.send({ message: "something went wrong token err" })
            } else {
                res.send({ auth: true, token: token })
            }

        })
    }


    //res.send(result)
})

router.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        //find user  ,  
        //verify password,
        //if true create token
        //send token response
        let user = await User.findOne({ email: req.body.email })
        console.log(user, "llllllllllloooooogin");
        if (user) {
            bcrypt.compare(req.body.password, user.password).then((status) => {
                console.log(status, "statussss");
                if (status) {
                    Jwt.sign({ user }, jwtKey, { expiresIn: 86400 }, (err, token) => {
                        if (err) {
                            res.send({ message: "something went wrong token err" })
                        } else {
                            res.send({ auth: true, token: token })
                        }

                    })
                } else {
                    res.send({ message: "Wrong Password" })
                }
            }).catch((err) => {
                res.send({ message: "Hashing error occured" })
            })


        } else {
            res.send({ message: "no user found" })
        }
    } else {
        res.send({ message: "Invalid credentials" })
    }
})

router.get("/get-products", verifyUser, async (req, res) => {
    let product = await Product.findOne()
    let result = await product.save()
    res.send(result)
})

router.post("/profile", async (req, res) => {
    console.log(req.body, "bodyyyyyy")
    ab = await req.files
    console.log(req, "mfilessssssssss", ab, "mmmmmmmmmmmmmm");
    res.send({ message: "result" })
})


module.exports = router