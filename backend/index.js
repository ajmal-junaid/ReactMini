const express = require("express");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors());
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
require("./db/config");



//routes 
app.use('/', userRoutes)
app.use('/admin', adminRoutes)

app.listen(3000);












