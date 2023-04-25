import express from "express"
import { createCourse, getAllCourses,getCourseLectures,addLecture,deleteCourse,deleteLecture} from "../Controllers/courseController.js";
import singleUpload from '../Middlewares/multer.js'
import { AuthorizeAdmin, AuthorizeSubscribers, isAuthenticated } from "../Middlewares/auth.js";
const router=express.Router();

//get all courses without lecture
router.route("/courses").get(getAllCourses)//get req on /api/v1/course call this function

//create course only admin
router
  .route("/createcourse")
  .post(isAuthenticated, AuthorizeAdmin, singleUpload, createCourse);
  
router.route("/course/:id").get(isAuthenticated,AuthorizeSubscribers,getCourseLectures).
post(isAuthenticated,AuthorizeAdmin,singleUpload,addLecture)
.delete(isAuthenticated,AuthorizeAdmin,deleteCourse)

router.route('/lecture').delete(isAuthenticated,AuthorizeAdmin,deleteLecture)

export default router