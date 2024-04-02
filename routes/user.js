const user = require("../controllers/user");
const express = require("express");
const router = express.Router();
const tryCatch = require("../middleware/tryCatch");


router 
.post("/register",tryCatch(user.userRegister))
.post("/login",tryCatch(user.userLogin))





module.exports = router
