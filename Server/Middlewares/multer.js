import multer from 'multer'

const storage=multer.memoryStorage()//store file in memory

const singleUpload=multer({storage}).single("file")//The Request object will be populated with a file object containing information about the processed file
//this name should be used whenever we are taking file from req
console.log("calllled")
export default singleUpload
