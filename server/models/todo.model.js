import mongoose from "mongoose";

const todoSchema=mongoose.Schema({
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
      },
      title:{
        type:String,
        default:"No Title"
      },
      description:{
        type:String,
        required:true,
    },
    status:{
          type:String,
          default:"Pending",
      },
      assignedUsers:{
           type:[String],
           default:[]
      }
},{timestamps: true})

const Todo=mongoose.model("Todo",todoSchema);
export default Todo;