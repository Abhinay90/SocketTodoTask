import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const routes = {};

routes.createUser = async (req, res) => {
  try {
    const { name, email, password, assignedUsers } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All field is required" });
    const existEmail = await User.findOne({ email });
    if (existEmail)
      return res.status(400).json({ error: "Email already exist" });
    const bcryptPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: bcryptPassword,
      assignedUsers,
    });
    return res
      .status(201)
      .json({ result: newUser, message: "User Registred successfully" });
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
};

routes.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "All field is required" });
    
    const newUser = await User.findOne({email});
    const isPasswordCorrect=await bcrypt.compare(password,newUser.password)
    if(!isPasswordCorrect){
           return res.status(400).json({ error: "Password is wrong" });
       }    
     const token= jwt.sign({id:newUser._id,name:newUser.name},"secret",{expiresIn:"1h"})  
    return res
      .status(200)
      .json({ result: token, message: "User Login successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

routes.getUserProfile=async (req,res)=>{
         try{
           const user=await User.findById(req.userId,{password:0});
           if(!user)
             return res.status(404).json({error:"User not found"});
            
           return res.status(200).json({result:user});
         }catch(error){
            res.status(500).json({error:error.message});
         }
}

routes.updateUserProfile=async (req,res)=>{
         try{
           const user=await User.findByIdAndUpdate(req.userId,req.body,{new:true});
           if(!user)
             return res.status(404).json({error:"User not found"});
           return res.status(200).json({result:user});
         }catch(error){
            res.status(500).json({error:error.message});
         }
}


export default routes;
