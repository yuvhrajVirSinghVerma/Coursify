import jwt from "jsonwebtoken"
import { catchAsyncError } from './catchAsyncError.js'
import ErrorHandler from "../Utils/ErrorHandler.js";
import { User } from "../Models/User.js";
export const isAuthenticated=catchAsyncError(async(req,res,next)=>{

  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Not Logged In", 401));
//decoded will contain this obj {_id:this._id}
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();


})
export const AuthorizeAdmin=(req,res,next)=>{

    if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );

  next();
}
export const AuthorizeSubscribers=(req,res,next)=>{

    // console.log("::::",req.user.role,req.user.name)
    if (req.user.subscription.status !== "active" && req.user.role !== "admin")
    return next(
      new ErrorHandler(`Only Subscribers can acces this resource`, 403)
    );

  next();
}