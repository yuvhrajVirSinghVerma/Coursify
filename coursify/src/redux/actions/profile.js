import {server} from '../store'
import axios from 'axios'

export const updateProfile=(name,email)=>async(dispatch)=>{

    try {
        dispatch({type:'upadteProfileRequest'})

        const{data}=await axios.put(`${server}/updateprofile`,{
            name,email
        },{

            headers:{
                "Content-Type":'application/json'
            },
            withCredentials:true
        })
        dispatch({type:'upadteProfileSuccess',payload:data.message})

    } catch (error) {
        dispatch({type:'upadteProfileFail'},error.response.data.message)
    }
}
export const updateProfilePicture=(formdata)=>async(dispatch)=>{

    try {
        dispatch({type:'updateProfilePictureRequest'})
        console.log("formdata",formdata)
        const { data } = await axios.put(
            `${server}/updateprofilepicture`,
            formdata,
            {
              headers: {
                'Content-type': 'multipart/form-data',
              },
      
              withCredentials: true,
            }
          );
        dispatch({type:'updateProfilePictureSuccess',payload:data.message})

    } catch (error) {
        dispatch({type:'updateProfilePictureFail'},error.response.data.message)
    }
}


export const changePassword=(oldPassword,newPassword)=>async(dispatch)=>{

    try {
        dispatch({type:'changePasswordRequest'})

        const{data}=await axios.put(`${server}/changepassword`,{
            oldPassword,newPassword
        },{

            headers:{
                "Content-Type":'application/json'
            },
            withCredentials:true
        })
        dispatch({type:'changePasswordSuccess',payload:data.message})

    } catch (error) {
        dispatch({type:'changePasswordFail'},error.response.data.message)
    }
}
 

export const forgetPassword=(email)=>async(dispatch)=>{

    try {
        dispatch({type:'forgetPasswordRequest'})
        
        const{data}=await axios.post(`${server}/forgetpassword`,{
            email
        },{

            headers:{
                "Content-Type":'application/json'
            },
            withCredentials:true
        })
        dispatch({type:'forgetPasswordSuccess',payload:data.message})

    } catch (error) {
        console.log(error)
        dispatch({type:'forgetPasswordFail',error:error.response.data.message})
    }
}


export const resetPassword=(token,password)=>async(dispatch)=>{

    try {
        dispatch({type:'resetPasswordRequest'})

        console.log("reducer ",password)
        const{data}=await axios.put(`${server}/resetpassword/${token}`,{
            password
        },{

            headers:{
                "Content-Type":'application/json'
            },
            withCredentials:true
        })
        dispatch({type:'resetPasswordSuccess',payload:data.message})

    } catch (error) {
        dispatch({type:'resetPasswordFail'},error.response.data.message)
    }
}