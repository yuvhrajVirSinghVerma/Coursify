export const catchAsyncError=(PassedFn)=>{
    return (req,res,next)=>{
        console.log(req.body)
        Promise.resolve(PassedFn(req,res,next)).catch(next)
    }
}