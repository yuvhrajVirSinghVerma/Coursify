import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import introVideo from '../../assets/Videos/intro.mp4'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate, useParams} from 'react-router-dom'
import { getCourseLectures } from '../../redux/actions/course'
import Loader from '../Layout/loader/loader'
export default function CoursePage({user}) {
    const lectureTitle="Lecture Title"
    const [lectureNumber,setLectureNumber]=useState(0)
    
    const{loading,lectures}=useSelector(state=>{
        console.log(state.courses)
        return state.courses
    })
    //temp api data
    // const lectures=[
    //     {
    //         _id:"ggsgsgss",
    //     title:"sample",
    //     description:"dddffd",
    //     video:{
    //         url:"ddddd"
    //     }
    //     },
    //     {
    //         _id:"ggsgsgss 2",
    //     title:"sample 2",
    //     description:"dddffd",
    //     video:{
    //         url:"ddddd"
    //     }
    //     },
    //    {
    //     _id:"ggsgsgss 3",
    //     title:"sample 3",
    //     description:"dddffd",
    //     video:{
    //         url:"ddddd"
    //     }
    //    }
    // ]


    const dispatch=useDispatch();
    const params=useParams()
    useEffect(()=>{
        dispatch(getCourseLectures(params.id));
    },[dispatch,params.id])


    console.log("user :  ",user,user.subscription)
    if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }
  return (
    loading?<Loader/>
  :
  <Grid minH={'90vh'} templateColumns={['1fr','3fr 1fr']}>
  {lectures && lectures.length>0 ? (
    <>
    <Box>
  <video 
  width={'100%'}
    controls 
    src={lectures[lectureNumber].video.url} 
    controlsList='nodownload noremoteplayback'
    disablePictureInPicture
    disableRemotePlayback />

    <Heading children={`#${lectureNumber+1} ${lectures[lectureNumber].title}`} m='4'/>
    <Heading children="Description" m='4'/>

    <Text m='4' children={lectures[lectureNumber].description}/>
  </Box>

  <VStack>
      
      {lectures.map((ele,idx)=>(
          <button key={ele._id}
          style={{
              width:"100%",
              padding:'1rem',
              textAlign:'center',
              margin:0,
              borderBottom:'1px solid rgba(0,0,0,0.2)'
              }}
              onClick={()=>setLectureNumber(idx)}
          >
              <Text noOfLines={1}>
                  #{idx+1} {ele.title}
              </Text>
          </button>
      ))}
  </VStack>
    </>
  )
    :
    <Heading children={'No Lectures'}/>
  }
</Grid>
  )
}
