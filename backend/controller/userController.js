import user from "../model/userModel.js";
import asyncHandler from "../middleware/asyncHandle.js";
import bcrypt from "bcryptjs";
import getToken from "../assets/getToken.js";

const createUser = asyncHandler(async (req, res) => {
   const {username, email, password} = req.body;

   if(!username || !email || !password){
    throw new Error("please enter your data");
   }
    const foundUser = await user.findOne({email});
    if(foundUser) res.status(409).json({message: "user already taken"});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new user ({username, email, password: hashedPassword});
 
    try {
           await newuser.save();
           getToken(res, newuser._id);
           res.status(201).json({
            _id : newuser.id,
            username: newuser.username,
            email : newuser.email,
            isAdmin : newuser.isAdmin

           });
    } catch (error) {
        throw new Error('invalid data')
    }
    }
);

export {createUser};