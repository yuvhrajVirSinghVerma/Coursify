import { createReducer } from "@reduxjs/toolkit";

export const userReducer=createReducer({},{
    loginRequest:(state,action)=>{
        state.loading=true
    },
    loginSuccess:(state,action)=>{
        state.loading=false
        state.isAuthenticated=true
        state.user=action.payload.user
        state.message=action.payload.message
    },
    loginFail:(state,action)=>{
        console.log("login fail",action)
        state.loading=false
        state.isAuthenticated=false
        state.error=action.payload
    },
    logoutRequest:(state,action)=>{
        state.loading=true
    },
    logoutSuccess:(state,action)=>{
        state.loading=false
        state.isAuthenticated=false
        state.user=null
        state.message=action.payload
    },
    logoutFail:(state,action)=>{
        state.loading=false
        state.isAuthenticated=true
        state.error=action.payload
    },
    clearError:(state)=>{
        state.error=null
    },
    clearMessage:(state)=>{
        state.message=null
    },
    loadUserRequest:(state,action)=>{
        state.loading=true
    },
    loadUserSuccess:(state,action)=>{
        state.loading=false
        state.isAuthenticated=true
        state.user=action.payload
    },
    loadUserFail:(state,action)=>{
        state.loading=false
        state.isAuthenticated=false
        state.error=action.payload
    },
    registerRequest:(state,action)=>{
        state.loading=true
    },
    registerSuccess:(state,action)=>{
        state.loading=false
        state.isAuthenticated=true
        state.user=action.payload.user
        state.message=action.payload.message
    },
    registerFail:(state,action)=>{
        state.loading=false
        state.isAuthenticated=false
        state.error=action.payload
    },
})


export const profileReducer=createReducer({},{
    upadteProfileRequest:(state)=>{
        state.loading=true
    },

    upadteProfileSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    upadteProfileFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    changePasswordRequest:(state)=>{
        state.loading=true
    },
    changePasswordSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    changePasswordFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    updateProfilePictureRequest:(state)=>{
        state.loading=true
    },
    updateProfilePictureSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    updateProfilePictureFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    forgetPasswordRequest:(state)=>{
        state.loading=true
    },
    forgetPasswordSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    forgetPasswordFail:(state,action)=>{
        console.log("action",action )
        console.log("actionpayload",action.error )
        state.loading=false
        state.error=action.error
    },
    resetPasswordRequest:(state)=>{
        state.loading=true
    },
    resetPasswordSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    resetPasswordFail:(state,action)=>{
        console.log("action error",action )
        console.log("actionpayload error",action.error )
        state.loading=false
        state.error=action.payload
    },
    removeFromPlaylistRequest:(state)=>{
        state.loading=true
    },
    removeFromPlaylistSuccess:(state,action)=>{
        console.log("action error",action )
        console.log("actionpayload error",action.error )
        state.loading=false
        state.message=action.message
    },
    removeFromPlaylistFail:(state,action)=>{
        console.log("action error",action )
        console.log("actionpayload error",action.error )
        state.loading=false
        state.error=action.payload
    },





    clearError:(state)=>{
        state.error=null
    },
    clearMessage:(state)=>{
        state.message=null
    },
})

export const subscriptionReducer=createReducer({},{
    buySubscriptionRequest:(state)=>{
        state.loading=true
    },
    buySubscriptionSuccess:(state,action)=>{
        state.loading=false
        state.subscriptionId=action.payload
    },
    buySubscriptionFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },
    cancelSubscriptionRequest:(state)=>{
        state.loading=true
    },
    cancelSubscriptionSuccess:(state,action)=>{
        state.loading=false
        state.subscriptionId=action.payload
    },
    cancelSubscriptionFail:(state,action)=>{
        state.loading=false
        state.error=action.payload
    },



    clearError:(state)=>{
        state.error=null
    },
    clearMessage:(state)=>{
        state.message=null
    },
})