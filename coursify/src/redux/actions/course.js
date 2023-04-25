import {server} from '../store'
import axios from 'axios'
export const getAllCourses=(category="",keyword="")=>async(dispatch)=>{
    try {
        console.log(dispatch)
        dispatch({type:"allCoursesRequest"})
        const{data}=await axios.get(`${server}/courses?keyword=${keyword}&category=${category}`)

        console.log(data);
        dispatch({type:"allCoursesRequestSuccess",payload:data.courses})

    } catch (error) {
        console.log("get all courses ",error)
        dispatch({type:"allCoursesRequestFail",payload:error.response.data.message})
        
    }
}
export const getCourseLectures=(courseId)=>async(dispatch)=>{
    try {
        console.log(dispatch)
        dispatch({type:"getCourseRequest"})
        const{data}=await axios.get(`${server}/course/${courseId}`,{
            withCredentials:true
        })

        console.log(data);
        dispatch({type:"getCourseSuccess",payload:data.lectures})

    } catch (error) {
        console.log("get all courses ",error)
        dispatch({type:"getCourseFail",payload:error.response.data.message})
        
    }
}