import express from "express"
import { AuthorizeAdmin, AuthorizeSubscribers, isAuthenticated } from "../Middlewares/auth.js";
import { contact,courseRequest,getDashboardStats } from "../Controllers/otherControllers.js";
const router=express.Router();


router.route('/contact').post(contact)
router.route('/courserequest').post(courseRequest)


router.route('/admin/stats').get(isAuthenticated,AuthorizeAdmin,getDashboardStats)

export default router