import {server} from '../store'
import axios from 'axios'



export const contactUs=(name,email,message)=>async(dispatch)=>{
    try {
        dispatch({type:"contactRequest"})
        const{data}=await axios.post(`${server}/contact`,{name,email,message},{
            withCredentials:true,
            headers:{
                'Content-type':'application/json '
            }
        })

        dispatch({type:"contactSuccess",payload:data.message})

    } catch (error) {
        dispatch({type:"contactFail"})
        
    }
}
export const courseRequest=(name,email,course)=>async(dispatch)=>{
    try {
        dispatch({type:"courseRequest"})
        const{data}=await axios.post(`${server}/courserequest`,{name,email,course},{
            withCredentials:true,
            headers:{
                'Content-type':'application/json '
            }
        })

        console.log("request success",data)
        dispatch({type:"courseRequestSuccess",payload:data.message})

    } catch (error) {
        dispatch({type:"courseRequestFail"})
        
    }
}