import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users', // Reference to the 'User' collection
        required: true
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

export default mongoose.model('Points', pointSchema)