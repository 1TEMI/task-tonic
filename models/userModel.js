import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
})

export default mongoose.model('users', userSchema)

