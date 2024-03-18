import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/DB.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config(); 
const port = process.env.PORT || 5000;

const app = express();

 connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello world')
    
});
console.log('hellobackend' )


app.listen(port, () => { console.log(`server is running on port: ${port}`)} );
