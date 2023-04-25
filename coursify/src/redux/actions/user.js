import {server} from '../store'
import axios from 'axios'
export const login=(email,password)=>async(dispatch)=>{
    try {
        console.log(dispatch)
        dispatch({type:"loginRequest"})
        const{data}=await axios.post(`${server}/login`,{email,password},{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        })

        console.log(data);
        dispatch({type:"loginSuccess",payload:data})

    } catch (error) {
        dispatch({type:"loginFail",payload:error.response.data.message})
        
    }
}
export const loadUser=()=>async(dispatch)=>{
    try {
        dispatch({type:"loadUserRequest"})
        const{data}=await axios.get(`${server}/me`,{
            withCredentials:true
        })

        dispatch({type:"loadUserSuccess",payload:data.user})

    } catch (error) {
        dispatch({type:"loadUserFail",payload:error.response.data.message})
        
    }
}
export const logOut=()=>async(dispatch)=>{
    try {
        dispatch({type:"logoutRequest"})
        const{data}=await axios.get(`${server}/logout`,{
            withCredentials:true
        })
        dispatch({type:"logoutSuccess",payload:data.message})

    } catch (error) {
        dispatch({type:"logoutFail",payload:error.response.data.message})
        
    }
}
export const register=(formdata)=>async(dispatch)=>{
    try {
        dispatch({type:"registerRequest"})
        console.log("register ",formdata)
        const{data}=await axios.post(`${server}/register`,formdata,{
            headers:{
                'Content-type':'multipart/form-data',
            },
            withCredentials:true
        })
        dispatch({type:"registerSuccess",payload:data.message})

    } catch (error) {
        dispatch({type:"registerFail",payload:error.response.data.message})
        
    }
}

export const addToPlayList=(courseId)=>async(dispatch)=>{
    try {
        // console.log(dispatch)

        dispatch({type:"addToPlaylistRequest"})
        const{data}=await axios.post(`${server}/addtoplaylist`,{
            id:courseId
        },{
            headers:{
                'Content-type':'application/json',
            },
            withCredentials:true
        })

        console.log("playlist data",data);
        dispatch({type:"addToPlaylistRequestSuccess",payload:data.message})

    } catch (error) {
        dispatch({type:"addToPlaylistRequestFail",payload:error.response.data.message})
        
    }
}
export const removeFromPlayList=(courseId)=>async(dispatch)=>{
    try {
        console.log(dispatch)
        dispatch({type:"removeFromPlaylistRequest"})
        const{data}=await axios.delete(`${server}/removefromplaylist?id=${courseId}`,{
            withCredentials:true
        })

        console.log("playlist data",data);
        dispatch({type:"removeFromPlaylistSuccess",payload:data.message})

    } catch (error) {
        dispatch({type:"removeFromPlaylistFail",payload:error.response.data.message})
        
    }
}

export const buySubscription=()=>async(dispatch)=>{
    try {
        dispatch({type:"buySubscriptionRequest"})
        const{data}=await axios.get(`${server}/subscribe`,{
            withCredentials:true
        })

        console.log(data);
        dispatch({type:"buySubscriptionSuccess",payload:data.buySubscriptionId})

    } catch (error) {
        dispatch({type:"buySubscriptionFail",payload:error.response.data.message})
        
    }
}

export const cancelSubscription=()=>async(dispatch)=>{
    try {
        dispatch({type:"cancelSubscriptionRequest"})
        const{data}=await axios.delete(`${server}/subscribe/cancel`,{
            withCredentials:true
        })

        console.log(data);
        dispatch({type:"cancelSubscriptionSuccess",payload:data.buySubscriptionId})

    } catch (error) {
        dispatch({type:"cancelSubscriptionFail",payload:error.response.data.message})
        
    }
}