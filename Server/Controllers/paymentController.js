import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import { Payment } from "../Models/Payment.js";
import { User } from "../Models/User.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import {instance} from '../server.js'
import crypto from 'crypto'

export const buySubscription=catchAsyncError(async(req,res,next)=>{
    try {
        const user=await User.findById(req.user._id);

    if(user.role==='admin')return next(new ErrorHandler("Admin can't buy subscription",404))

    const  plan_id=process.env.PLAN_ID || "plan_LcVNEDWgWqKh4T" 
    //config

    const subscription=await instance.subscriptions.create({
        plan_id,
        customer_notify:1,
        total_count:12
    })

// we wiil get this obj after subcription is created

    //     "subscription": {
    //         "id": "sub_LcVwbutzpuzLPL",
    //         "entity": "subscription",
    //         "plan_id": "plan_LcVNEDWgWqKh4T",
    //         "status": "created",
    //         "current_start": null,
    //         "current_end": null,
    //         "ended_at": null,
    //         "quantity": 1,
    //         "notes": [],
    //         "charge_at": null,
    //         "start_at": null,
    //         "end_at": null,
    //         "auth_attempts": 0,
    //         "total_count": 12,
    //         "paid_count": 0,
    //         "customer_notify": true,
    //         "created_at": 1681222640,
    //         "expire_by": null,
    //         "short_url": "https://rzp.io/i/pIqh4adqb7",
    //         "has_scheduled_changes": false,
    //         "change_scheduled_at": null,
    //         "source": "api",
    //         "remaining_count": 11
    // }
    console.log("**********************")

    user.subscription.id=subscription.id;
    user.subscription.status=subscription.status

    console.log("++++++++++++++++++++++++++++")

    await user.save();
    res.status(201).json({
        success:true,
        subscriptionId:subscription.id
    })
    } catch (error) {
        console.log(error)
        res.status(201).json({
            success:false,
            error:error
        })
    }

})
export const paymentVerification=catchAsyncError(async(req,res,next)=>{
    const{razorpay_signature,razorpay_payment_id,razorpay_subscription_id}=req.body//these obj are provided us by razorpay api 

    const user=await User.findById(req.user._id)
    const subscription_id=user.subscription.id

    const generated_signature=crypto.createHmac('sha256','razorpay secret config').update(razorpay_payment_id+"|"+subscription_id,"utf-8")
    .digest("hex")

    const isAuthentic=generated_signature===razorpay_signature

    if(!isAuthentic)return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`)//we will make this in frontend

    await Payment.create({
        razorpay_signature,
        razorpay_payment_id,
        razorpay_subscription_id
    })
    //this data wil help in case of refund

    user.subscription.status='active'

    await user.save()

    res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`)

})

//to send key to frontend , we can also store it in frontend
export const getRazorPayKey=catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        key:process.env.RAZORPAY_API_KEY
    })
})
export const cancelSubscription=catchAsyncError(async(req,res,next)=>{

    const user=await User.findById(req.user._id);
    const subscriptionId=user.subscription.id;

    let refund =false;

    await instance.subscriptions.cancel(subscriptionId)

    const payment=await Payment.findOne({
        razorpay_subscription_id:subscriptionId
    })

    const gap=Date.now()-payment.createdAt;//thats why we have created schema to find the gap 

    const refundTime=(process.env.REFUND_DAYS )*24*60*60*1000

    if(gap<refundTime){
        await instance.payments.refund(payment.razorpay_payment_id);
        refund=true;
    }

    await payment.remove();

    user.subscription.id=undefined
    user.subscription.status=undefined

    await user.save()


    res.status(200).json({
        success:true,
        message:refund?"subscription canceled ,you will receive payment within 7 days"
        :
        "Subscription canceled No refund unitiated as subscription was cancelled after 7 days"
    })
})