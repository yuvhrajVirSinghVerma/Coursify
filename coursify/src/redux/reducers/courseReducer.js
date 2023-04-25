import { createReducer } from "@reduxjs/toolkit";

export const courseReducer=createReducer({courses:[],lectures:[]},{

    allCoursesRequest:(state)=>{
        state.loading=true
    },
    allCoursesRequestSuccess:(state,action)=>{
        state.loading=false
        state.courses=action.payload
    },
    allCoursesRequestFail:(state,action)=>{
        console.log("all course fail" ,action)
        state.loading=false
        state.error=action.payload
    },
    getCourseRequest:(state)=>{
        state.loading=true
    },
    getCourseSuccess:(state,action)=>{
        state.loading=false
        state.lectures=action.payload
    },
    getCourseFail:(state,action)=>{
        console.log("all course fail" ,action)
        state.loading=false
        state.error=action.payload
    },
    addToPlaylistRequest:(state)=>{
        state.loading=true
    },
    addToPlaylistRequestSuccess:(state,action)=>{
        state.loading=false
        state.message=action.payload
    },
    addToPlaylistRequestFail:(state,action)=>{
        console.log("add to playlist fail" ,action)
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