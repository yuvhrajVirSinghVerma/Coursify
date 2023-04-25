import express from 'express'
import { isAuthenticated } from '../Middlewares/auth.js'
import { buySubscription,cancelSubscription,getRazorPayKey,paymentVerification } from '../Controllers/paymentController.js'

const router=express.Router()

router.route('/subscribe').get(isAuthenticated,buySubscription)
router.route('/paymentverification').post(isAuthenticated,paymentVerification)

//sending razorpay key to frontend
router.route('/razropaykey').get(getRazorPayKey)

router.route("/subscribe/cancel").delete(isAuthenticated,cancelSubscription)
export default router