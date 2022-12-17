const express = require('express');
const router = express.Router();
const User = require('../db/User');

router.post("/login", (req, res) => {
    console.log(req.body, "kkkkkkkkkkk");
    if (req.body.username == "ajmal6201@gmail.com" && req.body.password == "12345") {
        res.send({ admin: true })
    } else {
        res.send({err:"invalid credentials"})
    }
})

router.get("/getusers", async (req, res) => {
    const user = await User.find().select("-password")
    console.log(user, "userssssss");
    if (user.length > 0) {
        res.send(user)
    } else {
        res.send({ result: "No Users Found" })
    }
})

router.get("/update/:id", async (req, res) => {
    let result = await User.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ "result": "No Records Found" })
    }
})

router.put("/update/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
})

router.get("/search/:key", async (req, res) => {
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

router.delete("/deleteuser/:id", async (req, res) => {
    let result = await User.deleteOne({ _id: req.params.id })
    res.send(result)
})



module.exports = router;