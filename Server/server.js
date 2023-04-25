import app from "./App.js";
import { connectDB } from "./Config/Database.js";
import cloudinary from 'cloudinary'
import RazorPay from "razorpay"
import Nodecron from 'node-cron'
import {Stats} from './Models/Stats.js'
connectDB()

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const instance=new RazorPay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_API_SECRET
})

Nodecron.schedule("0 0 0 1 * *",async()=>{
    try{
        await Stats.create({});
    }catch(e){
        console.log(e)
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`server started ${process.env.PORT}`)
})