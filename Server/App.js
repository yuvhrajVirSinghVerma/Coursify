import express from "express"
import {config} from "dotenv"
import course from "./Routes/courseRoutes.js"
import user from "./Routes/userRoutes.js"
import ErrorMiddleware from './Middlewares/Errror.js'
import cookieParser from "cookie-parser"
import payment from './Routes/paymentRoutes.js'
import other from './Routes/otherRoutes.js'
import cors from "cors";
config({
    path:"./Config/config.env"
})
const app=express()

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
app.use(cookieParser())
app.use("/api/v1",course)
app.use("/api/v1",user)
app.use("/api/v1",payment)
app.use("/api/v1",other)

export default app


app.use(ErrorMiddleware)