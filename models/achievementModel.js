import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    description:{
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
    },
    updateOn:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Achievements', achievementSchema)