import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/myapp');
        console.log(`successfully connected to mongoDB`);                    
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }   
}
export default connectDB; 