const express = require('express');
const router = express.Router();

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
        res.send({ msg: "send token" })
    }
}


router.post("/register", async (req, res) => {
    let result = new User(req.body);
    let user = await result.save()
    user = user.toObject();
    delete user.password;
    console.log(user,"sogggggggggggggggggggggggggnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnupppppppppppppp");
    Jwt.sign({ user }, jwtKey, { expiresIn: 86400 }, (err, token) => {
        if (err) {
            res.send({ auth: "false", message: "something went wrong token err" })
        }else{
            console.log(token, "from tokennnnnnnnnnn");
            res.send({ auth: true, token: token })
        }
        
    })
    //res.send(result)
})

router.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        //find user  ,  
        //verify password,
        //if true create token
        //send token response
        let user = await User.findOne(req.body).select("-password")
        console.log(user,"llllllllllloooooogin");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: 86400 }, (err, token) => {
                if (err) {
                    res.send({ auth: "false", message: "something went wrong token err" })
                } else {
                    res.send({ auth: true, token: token })
                }

            })

        } else {
            res.send({ auth: "false", message: "no user found" })
        }
    } else {
        res.send({ auth: "false", message: "Invalid credentials" })
    }
})

router.get("/get-products", verifyUser, async (req, res) => {
    let product = await Product.findOne()
    let result = await product.save()
    res.send(result)
})



module.exports = router