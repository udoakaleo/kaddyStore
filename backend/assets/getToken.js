import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv

const createToken = (res, userId) => {

    const accessToken = jwt.sign(
          {userId},
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn: '30d'});

         // set cookies
         res.cookie('jwt', accessToken, {
            httpOnly: true,
            secure: "",
            sameSite: 'true',
            maxAge: 10 * 24 * 60 * 60 * 1000
         }); 
         return accessToken;
};

export default createToken;