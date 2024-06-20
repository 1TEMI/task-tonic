import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please enter username']
    },
    fullname:{
        type: String,
        required : [true, 'please enter fullname' ]
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'please enter email' ]
    },
    password:{
        type: String,
        required: [true, 'please enter your password']
    },
})



const user = mongoose.model('users', userSchema)

export default user

