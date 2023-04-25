import {server} from '../store'
import axios from 'axios'



export const createCourse=(formData)=>async(dispatch)=>{
    try {
        dispatch({type:"createCourseRequest"})
        console.log('create course : ',formData)
        const{data}=await axios.post(`${server}/createcourse`,formData,{
            withCredentials:true,
            headers:{
                'Content-type':'multipart/form-data'
            }
        })

        dispatch({type:"createCourseSuccess",payload:data.message})

    } catch (error) {
        dispatch({type:"createCourseFail",payload:error.response.data.message})
        
    }
}
export const deleteCourse=(courseId)=>async(dispatch)=>{
    try {
        dispatch({type:"deleteCourseRequest"})
        const{data}=await axios.delete(`${server}/course/${courseId}`,{
            withCredentials:true,
        })

        dispatch({type:"deleteCourseSuccess",payload:data.message})

    } catch (error) {
        dispatch({type:"deleteCourseFail",payload:error.response.data.message})
        
    }
}


export const addLectures=(courseId,formData)=>async(dispatch)=>{
    try {
        dispatch({type:"addLecturesRequest"})
        const{data}=await axios.post(`${server}/course/${courseId}`,formData,{
            withCredentials:true,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })

        dispatch({type:"addLecturesSuccess",payload:data.message})

    } catch (error) {
        dispatch({type:"addLecturesFail",payload:error.response.data.message})
        
    }
}


export const deleteLecture=(courseId,lectureId)=>async(dispatch)=>{
    try {
        console.log("delete lecture ",courseId,lectureId)
        dispatch({type:"deleteLecturesRequest"})
        const{data}=await axios.delete(`${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,{
            withCredentials:true,
           
        })

        dispatch({type:"deleteLecturesSuccess",payload:data.message})

    } catch (error) {
        dispatch({type:"deleteLecturesFail",payload:error.response.data.message})
        
    }
}

export const getAllUsers=()=>async(dispatch)=>{
    try {
        dispatch({type:"getAllUsersRequest"})
        const{data}=await axios.get(`${server}/admin/users`,{
            withCredentials:true,
        })

        dispatch({type:"getAllUsersRequestSuccess",payload:data.users})

    } catch (error) {
        dispatch({type:"getAllUsersRequestFail",payload:error.response.data.message})
        
    }
}
export const updateUserRole=(userId)=>async(dispatch)=>{
    try {
        dispatch({type:"updateUserRequest"})
        const{data}=await axios.put(`${server}/admin/user/${userId}`,{},{
            withCredentials:true,
        })

        dispatch({type:"updateUserRequestSuccess",payload:data.message})

    } catch (error) {
        console.log("update role, error" , error)
        dispatch({type:"updateUserRequestFail",payload:error.response.data.message})
        
    }
}
export const deleteUser=(userId)=>async(dispatch)=>{
    try {
        dispatch({type:"deleteUserRequest"})
        const{data}=await axios.delete(`${server}/admin/user/${userId}`,{
            withCredentials:true,
        })

        dispatch({type:"deleteUserRequestSuccess",payload:data.message})

    } catch (error) {
        dispatch({type:"deleteUserRequestFail",payload:error.response.data.message})
        
    }
}


export const getDashBoardStats=()=>async(dispatch)=>{
    try {
        dispatch({type:"getAdminStateRequest"})
        const{data}=await axios.get(`${server}/admin/stats`,{
            withCredentials:true,
        })

        dispatch({type:"getAdminStateRequestSuccess",payload:data})

    } catch (error) {
        console.log('stats',error)
        dispatch({type:"getAdminStateRequestFail",payload:error.response.data.message})
        
    }
}