const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerUserController(req,res){

    try{
        const {name, email, password} = req.body || {}
    
        if(!name || !email || !password){
            return res.status(400).json({
                status:"fail",
                data:{},
                message:"Some Fields Are missing"
            })
        }
    
        const isUserAlreadyExists = await userModel.findOne({email});
    
        if(isUserAlreadyExists){
            return res.status(400).json({
                status:"fail",
                data:{},
                message:"User Already Exists"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const user = await userModel.create({
            name,
            email,
            password:hashedPassword
        })
    
        const token = jwt.sign(
            { id: user._id, name:user.name },
            process.env.JWT_SECRET,
            {expiresIn: "1d" }
        )
    
        res.cookie("token",token)
    
        res.status(201).json({
            status:"success",
            data: {
                user:{
                    id:user._id,
                    name,
                    email
                }
            },
            message:"User Registered Successfully"
        })

    }

    catch(err){
        res.status(500).json({
            status:"fail",
            data:{},
            message:err.message
        })
    }   
    

}

async function loginUserController(req,res){
    
    try{

        const {email, password} = req.body || {};
    
        if(!email || !password){
            return res.status(400).json({
                status:"fail",
                data:{},
                message:"Fields are missing"
            })
        }
    
        const user = await userModel.findOne({email})
    
        if(!user){
            return res.status(400).json({
                status:"fail",
                data:{},
                message:"Invalid Credentials"
            })
        }
    
        const isValidPassword = await bcrypt.compare(password, user.password);
    
        if(!isValidPassword){
            return res.status(400).json({
                status:"fail",
                data:{},
                message:"Invalid Email or Password"
            })
        }
    
        const token = jwt.sign(
        { id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );
    
        res.cookie("token", token);
        res.status(200).json({
            status:"success",
            data: {
                user:{
                    id:user._id,
                    name:user.name,
                    email
                }
            },
            message:"User Logged In Successfully"
      });

    }
    catch(err){
        res.status(500).json({
            status:"fail",
            data:{},
            message:err.message
        })
    }
    
}

function logoutUserController(req,res){
    
    try{
        res.clearCookie("token")
    
        res.status(200).json({
            status:"success",
            data:{},
            message:"User Logged Out successfully"
        })
    }
    catch(err){
        res.status(500).json({
            status:"fail",
            data:{},
            message:err.message
        })
    }

}


module.exports = {registerUserController, loginUserController, logoutUserController}