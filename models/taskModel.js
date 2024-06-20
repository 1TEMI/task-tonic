import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    status:{
        type: String,
        require: true
    },
    point:{
        type: Number,
        require: true
    },
    createdOn:{
        type: Date,
        default: Date.now
    }
})

const task = mongoose.model('Tasks', taskSchema)
export default task