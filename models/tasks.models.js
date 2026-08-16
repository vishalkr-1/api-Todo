import mongoose from 'mongoose';
import { type } from 'os';

const taskSchema = mongoose.Schema({
    task_name: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type:String,
      enum: ["pending", "in-progress", "completed"],
       default: "pending"
    },
    start_Date: {
        required: true,
        type:Date
    },
    completed_Date: {
        required: false,
        type:Date
    }
})

const tasks = mongoose.model('task',taskSchema)
export default tasks