import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : {
        type : "string",
        required : true
    },

    email: {
        type : "string",
        unique : true,
        password : "string",
         
    },

    password : {
        type : "string",
        required : true
    }, 

     isAdmin : {
       type : Boolean,
       required : true,
       default : false
     }
},   
     {timestamps: true}
);


const user = mongoose.model('user', userSchema);

export default user;