import mongoose from "mongoose";

export const connectDB=async()=>{

    try{
        const {connection}=await mongoose.connect(process.env.MONGO_URI_A)
        console.log(`MongoDB connected with ${connection.host}`)
    }
    catch(e){
        console.log('catch :',e);
    }
}