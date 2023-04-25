import { catchAsyncError } from "../Middlewares/catchAsyncError.js"
import { Course } from "../Models/Course.js"
import { Stats } from "../Models/Stats.js";
import ErrorHandler from '../Utils/ErrorHandler.js'
import getDataUri from "../Utils/dataURI.js";
import cloudinary from 'cloudinary'

export const getAllCourses=catchAsyncError(async(req,res,next)=>{

    // const courses=await Course.find().select("-lectures");//we are restricting to get the lectures array from db we will only show when user is subscribed
    
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";
  
    const courses = await Course.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
      category: {
        $regex: category,
        $options: "i",
      },
    }).select("-lectures");
    
    res.status(200).json({
        success:true,
        courses
    })
})
export const createCourse=catchAsyncError(async(req,res,next)=>{

    const{title,description,category,createdBy}=req.body
    console.log("jkwbcecbfe ",req.body,)

    if(!title || !description || !category || !createdBy) {
        return next(new ErrorHandler("Please add all fields",400))//called the next middleware in this route next middleware is errormiddleware
    }


    const file=req.file;//with help of multer we can acces this
    
    console.log(file)
    
    const fileUri=getDataUri(file)
    const mycloud=await cloudinary.v2.uploader.upload(fileUri.content)
    await Course.create({
        title,description,category,createdBy,poster:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        }
    })
    res.status(201).json({
        success:true,
        message:"course created successfully"
    })

})


export const getCourseLectures=catchAsyncError(async(req,res,next)=>{

    const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  course.views += 1;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
})
export const addLecture=catchAsyncError(async(req,res,next)=>{

    const{title,description}=req.body
    const course = await Course.findById(req.params.id);

    const file=req.file;//with help of multer we can acces this
    
   
  if (!course) return next(new ErrorHandler("Course not found", 404));

  //upload videos in cloudinary
  const fileUri=getDataUri(file)
  const mycloud=await cloudinary.v2.uploader.upload(fileUri.content,{
    resource_type:'video'
  })  

  course.lectures.push({
    title,description,video:{
        public_id:mycloud.public_id,
        url:mycloud.secure_url
    }
  })

  course.numOfVideos=course.lectures.length

  await course.save()

  res.status(200).json({
    success: true,
    message:"lecture added in course",
  });
})
export const deleteCourse=catchAsyncError(async(req,res,next)=>{
const {id}=req.params

const course=await Course.findById(id)
  if (!course) return next(new ErrorHandler("Course not found", 404));

await cloudinary.v2.uploader.destroy(course.poster.public_id)//to delete poster we need poster id thats why we have added in our schema

for(let i=0;i<course.lectures.length;i++){
  const lect=course.lectures[i];
await cloudinary.v2.uploader.destroy(lect.video.public_id,{
  resource_type:'video'
})//to delete poster we need poster id thats why we have added in our schema
}

await Course.deleteOne({_id:id})
  res.status(200).json({
    success: true,
    message:"Course Deleted Successfully",
  });
})


export const deleteLecture=catchAsyncError(async(req,res,next)=>{
  const{courseId,lectureId}=req.query;
  console.log("delete lecture ",req.query)

  const course=await Course.findById(courseId);

  if(!course)return next(new ErrorHandler('Course Not Found',404));

  console.log("lectures : ",course , " : ",course.lectures)
  const lecture = course.lectures.find((item) => {
    if (item._id.toString() === lectureId.toString()) return item;
  });
  await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
    resource_type:'video'
  })

  course.lectures=course.lectures.filter((item)=>item._id.toString()!==lectureId.toString())

  course.numOfVideos=course.lectures.length;
  await course.save()

  res.status(200).json({
    success:true,
    message:"Lecture Deleted Sucessfully"
  })

})

const changeStream = Course.watch();

changeStream.on('change',()=>{
  console.log("course db changes")

})
// Course.watch().on('change', async () => {

//   const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

//   const courses = await Course.find({});

//   let totalViews = 0;

//   for (let i = 0; i < courses.length; i++) {
//     totalViews += courses[i].views;
//   }
//   stats[0].views = totalViews;
//   stats[0].createdAt = new Date(Date.now());

//   await stats[0].save();
// });