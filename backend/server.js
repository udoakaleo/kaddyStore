import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/DB.js';

dotenv.config(); 
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello world')
    
});
console.log('hellobackend' )


app.listen(port, () => { console.log(`server is running on port: ${port}`)} );