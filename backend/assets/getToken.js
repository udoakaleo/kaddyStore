import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv

const createToken = (res, userId) => {

    const accessToken = jwt.sign(
          {userId},
         process.env.ACCESS_TOKEN_SECRET,
         {expiresIn: '30d'});

         // const refreshToken = jwt.sign( 
         //    {"username" : foundUser.username},
         //     process.env.REFRESH_TOKEN_SECRET,
         //     {expiresIn : '1d'}
         //  );

         // set cookies
         res.cookie('jwt', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000
         }); 
         return accessToken; 
};

export default createToken;