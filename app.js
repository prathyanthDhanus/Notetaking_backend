const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require("cors")
const port = 3000;

app.use(express.json());
app.use(cors())
env.config() //env config

const url = process.env.MONGODB_URL


const note = require("./routes/note")
app.use("/",note);

const user = require("./routes/user")
app.use("/user",user)

// -------- mongodb connection setup-----------

mongoose.connect(url)
.then(()=>{
    console.log("mongodb connected")
})
.catch((error)=>{
    console.log("Error:",error) 
})




//---------- server creation-----------

app.listen(port,()=>{
    console.log(`server running on  ${port}`)
})





