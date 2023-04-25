import express from "express"
const router=express.Router();
import { login, register,logout,getMyProfile,changePassword,updateProfile,updateProfilePicture,forgetPassword,resetPassword ,addToPlaylist,removeFromPlaylist,getAllUsers,updateUserRole,deleteUser,deleteMyProfile} from "../Controllers/userController.js";

import {AuthorizeAdmin, isAuthenticated} from '../Middlewares/auth.js'
import singleUpload from '../Middlewares/multer.js'
router.route('/register').post(singleUpload,register)
router.route('/login').post(login)
router.route('/logout').get(logout)

router.route('/me').get(isAuthenticated,getMyProfile)
router.route('/me').delete(isAuthenticated,deleteMyProfile)

router.route('/changepassword').put(isAuthenticated,changePassword)
router.route('/updateprofile').put(isAuthenticated,singleUpload,updateProfile)
router.route('/updateprofilepicture').put(isAuthenticated,singleUpload,updateProfilePicture)

router.route('/forgetpassword').post(forgetPassword)
router.route('/resetpassword/:token').put(resetPassword)

router.route('/addtoplaylist').post(isAuthenticated,addToPlaylist)
router.route('/removefromplaylist').delete(isAuthenticated,removeFromPlaylist)


//Admin routes

router.route('/admin/users').get(isAuthenticated,AuthorizeAdmin,getAllUsers)
router
  .route("/admin/user/:id")
  .put(isAuthenticated, AuthorizeAdmin, updateUserRole)
  .delete(isAuthenticated, AuthorizeAdmin, deleteUser);


export default router