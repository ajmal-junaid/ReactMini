const express = require("express");
const cors = require("cors")
const app = express();

const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
require("./db/config");

app.use(express.json());
app.use(cors());

//routes 
app.use('/', userRoutes)
app.use('/admin', adminRoutes)

app.listen(3000);












