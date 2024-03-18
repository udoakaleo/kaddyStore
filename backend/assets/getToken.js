import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv

const createToken = (res, userId) => {

    const accessToken = jwt.sign(
          {userId},
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn: '300d'});

         // set cookies
         res.cookies('jwt', accessToken, {
            httpOnly: true,
            //secure: "",
            sameSite: 'strict',
            maxAge: 10 * 24 * 60 * 60 * 1000
         }); 
         return accessToken;
}

export default createToken;