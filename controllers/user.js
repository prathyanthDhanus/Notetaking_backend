
const userSchema = require("../models/user");
const bcrypt = require("bcrypt");


module.exports = {

    //--------- user register ---------

     userRegister : async (req,res)=>{
         
        const {userName,email,password} = req.body;
        const findUser = await userSchema.findOne({email:email});
        
        if(findUser){
            return res.status(403).json({
                status:"failure",
                message : "User already exist"
            })
        }

        const hashedpassword = await bcrypt.hash(password,10)

     const newUser = new userSchema({
        username:userName,
        email:email,
        password:hashedpassword
     })

     await newUser.save()
     return res.status(201).json({
        status:"Success",
        message : "User registered successfully"
    })

    },

    // ----------  user login -----------------

    userLogin : async (req,res)=>{

        const {email,password} = req.body;
         const findUser = await userSchema.findOne({email:email});
        
         if(!findUser){
            return res.status(404).json({
                status:"failure",
                message : "User not found",
                
            })
         }

         const comparePassword = await bcrypt.compare(password,findUser.password)
         if(comparePassword){
            return res.status(200).json({
                status:"Success",
                message : "User logged in successfully",
                data:findUser
            })
         }

         return res.status(403).json({
            status:"failure",
            message : "Wrong password"
        })


    }
}