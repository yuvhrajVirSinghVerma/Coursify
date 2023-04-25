import {catchAsyncError} from '../Middlewares/catchAsyncError.js'
import {User} from '../Models/User.js'
import { sendToken } from '../Utils/sendToken.js';
import ErrorHandler from '../Utils/ErrorHandler.js'
import { sendEmail } from '../Utils/sendEmail.js';
import crypto from 'crypto'
import { Course } from '../Models/Course.js';
import cloudinary from 'cloudinary'
import getDataUri from '../Utils/dataURI.js';
import { Stats } from '../Models/Stats.js';


export const register=catchAsyncError(async(req,res,next)=>{

    const {name,email,password}=req.body;
    const file=req.file;//with help of multer we can acces this

    console.log("register" ,req.body,req.file)
    

    if(!name || !password || !email || !file){
        return next(new ErrorHandler("Please Enter All Fields",400))
    }

    console.log("1")
    let user=await User.findOne({email})

    if(user) return next(new ErrorHandler("User Already Exist",409))
    console.log("2")

    //upload file on cloudinary
    
    
    const fileUri=getDataUri(file)
    console.log("3")
    const mycloud=await cloudinary.v2.uploader.upload(fileUri.content)

    user=await User.create({
        name,email,password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        }
    })

    sendToken(res,user,"Registerd,Successfully",201)
    
})


export const login=catchAsyncError(async(req,res,next)=>{

  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  sendToken(res, user, `Welcome back, ${user.name}`, 200);
})


export const logout=catchAsyncError(async(req,res)=>{
  res
  .status(200)
  .cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })
  .json({
    success: true,
    message: "Logged Out Successfully",
  });
})



export const getMyProfile=catchAsyncError(async(req,res)=>{

    console.log("req",req.user)
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
    
})


export const changePassword=catchAsyncError(async(req,res,next)=>{

    const {oldPassword,newPassword}=req.body;

    if(!oldPassword || !newPassword){
        return next(new ErrorHandler("Please Enter All Fields",400))
    }
    const user=await User.findById(req.user._id).select('+password')//in mode we have set select false

    const isMatch=await user.comparePassword(oldPassword)//assume we have function which will compare pass and return bool\

    if(!isMatch){
        return next(new ErrorHandler("Incorrect Old Password",400))
    }

    user.password=newPassword

    await user.save()
    console.log("user",user)


    res.status(200).json({
         success:true,
         message:"Password Chnaged Successfully",
    })
    
})


export const updateProfile=catchAsyncError(async(req,res)=>{

    const {name,email}=req.body;
    const user=await User.findById(req.user._id).select('+password')//in mode we have set select false

    if(name)user.name=name;
    if(email)user.email=email;


    await user.save()

    res.status(200).json({
         success:true,
         message:"Profile updated Successfully",
    })
    
})


export const updateProfilePicture=catchAsyncError(async(req,res)=>{
  
  try {
    const file=req.file;//with help of multer we can acces this
    //req,user is created at auth.js
    console.log("2 : ",file)
    const user=await User.findById(req.user._id)
    const fileUri=getDataUri(file)
    const mycloud=await cloudinary.v2.uploader.upload(fileUri.content)

    
     await cloudinary.v2.uploader.destroy(user.avatar.public_id)

     user.avatar={
      public_id:mycloud.public_id,
      url:mycloud.secure_url
     }

     await user.save()

    res.status(200).json({
         success:true,
         message:"Profile Picture updated Successfully",
    })
  } catch (error) {
    console.log(error)
  }
    
})


export const forgetPassword=catchAsyncError(async(req,res,next)=>{
    const { email } = req.body;

    const user = await User.findOne({ email });
  
    if (!user) return next(new ErrorHandler("User not found", 400));
  
    const resetToken = await user.getResetToken();
  
    await user.save();
  
    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  
    const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;
  
    console.log(url)
    // Send token via email
    await sendEmail(user.email, "CourseBundler Reset Password", message);
  
    res.status(200).json({
      success: true,
      message: `Reset Token has been sent to ${user.email}`,
    });


})


export const resetPassword=catchAsyncError(async(req,res,next)=>{
   try {
     // /resetpassword/:token  getting token from this
     const { token } = req.params;

     console.log("token" ,token)
     const resetPasswordToken = crypto
       .createHash("sha256")
       .update(token)
       .digest("hex");
   
     const user = await User.findOne({
       resetPasswordToken,
       resetPasswordExpire: {
         $gt: Date.now(),
       },
     });
   
     console.log("user ",user)
     if (!user)
       return next(new ErrorHandler("Token is invalid or has been expired", 401));
   
     user.password = req.body.password;
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire = undefined;
   
     await user.save();
   
     res.status(200).json({
       success: true,
       message: "Password Changed Successfully",
     });
   } catch (error) {
    console.log(error)
   }
})

export const addToPlaylist=catchAsyncError(async(req,res,next)=>{
    // req.user is made in auth
    console.log("server add to playlist ",req.body)
    const user = await User.findById(req.user._id);

    const course = await Course.findById(req.body.id);
  
    if (!course) return next(new ErrorHandler("Invalid Course Id", 404));
  
    //item.course is id of course in user schema
    const itemExist = user.playlist.find((item) => {
      if (item.course.toString() === course._id.toString()) return true;
    });
  
    if (itemExist) return next(new ErrorHandler("Item Already Exist", 409));
  
    user.playlist.push({
      course: course._id,
      poster: course.poster.url,
    });
  
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Added to playlist",
    });
})
export const removeFromPlaylist=catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);
  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  user.playlist = newPlaylist;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Removed From Playlist",
  });
})



//Admin Controllers

export const getAllUsers=catchAsyncError(async(req,res,next)=>{
  const users=await User.find({})

  res.status(200).json({
    success:true,
    users
  })
})
export const updateUserRole=catchAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.params.id)

  if(!user)return next(new ErrorHandler("User Not Found",404));
const preRole=user.role
  if(user.role==='admin')user.role='user';
  else user.role='admin'

  await user.save();

  res.status(200).json({
    success:true,
    message:`${preRole} changed to ${user.role}`
  })
})
export const deleteUser=catchAsyncError(async(req,res,next)=>{
  const id=req.params.id
    const user = await User.findById(id);
  
    if (!user) return next(new ErrorHandler("User not found", 404));
  
    // await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  
    // Cancel Subscription
  
    await User.deleteOne({_id:id});
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
})

export const deleteMyProfile=catchAsyncError(async(req,res,next)=>{
  const id=req.user._id
    const user = await User.findById(req.user._id);
  
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  
    // Cancel Subscription
  
    await user.deleteOne({_id:id});
  
    res.status(200).cookie("token",null,({
      expires:new Date(Date.now())
    })).json({
      success: true,
      message: "User Deleted Successfully",
    });
})
User.watch().on("change",async()=>{
  const stats=await Stats.find({}).sort({createdAt:"desc"}).limit(1);//wee will take only one obj in arr
  const subscription=await User.find({"subscription.status":"active"})//get user with subscription status active

  stats[0].subscription=subscription.length;
  stats[0].users=await User.countDocuments()
  stats[0].createdAt=new Date(Date.now())

  await stats[0].save();

}) 