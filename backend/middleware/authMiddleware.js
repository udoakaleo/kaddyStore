import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "./asyncHandle.js";

const authenticate = asyncHandler( async(req, res, next) => {
 let token;

 token = req.cookies.jwt;
     if(token) {


          try {
              const project = 
          } catch (error) {
            
          }
        const decoded = jwt.verify(token);

     }

})
