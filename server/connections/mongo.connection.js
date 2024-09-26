import mongoose from "mongoose";

const MONGO_URL=process.env.MONGO_URL||"mongodb://localhost:27017/test"

const mongoConnect=async()=>{
      try{
          await mongoose.connect(MONGO_URL)
          console.log("mongoDB is connected")
      }catch(err){
          throw new Error(err)
      }
}

export default mongoConnect