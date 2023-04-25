import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'

import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { courseRequest } from '../../redux/actions/others'
import {useDispatch, useSelector} from 'react-redux'
import toast from 'react-hot-toast'

export default function Contact() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[course,setCourse]=useState("")

    const dispatch=useDispatch()
    const {loading,error,message:stateMessage}=useSelector(state=>state.other)


    const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(courseRequest(name,email,course))
    }


    useEffect(()=>{
      if(error){
        toast.error(error)
        dispatch({type:'clearError'})
      }
      if(stateMessage){
        toast.success(stateMessage)
        dispatch({type:'clearMessage'})
      }
    },[dispatch,error,stateMessage])
  return (
    <Container h='92vh'>
        <VStack h={'full'} justifyContent={"center"} spacing='16'>
            <Heading children={'Request New Course'}/>
            <form onSubmit={submitHandler} style={{width:'100%'}}>
            <FormLabel htmlFor='name' children="Name"/>
            <Box my={'4'}>
            <Input required id="name"
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder={"xyz"}
            type="text"
            focusBorderColor='yellow.500'
            />
            </Box>

         
            <Box my={'4'}>
            <FormLabel htmlFor='email' children="Email"/>
            <Input required id="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder={"xyz@gmail.com"}
            type="email"
            focusBorderColor='yellow.500'
            />
            </Box>

            <Box my={'4'}>
            <FormLabel htmlFor='course' children="Course"/>
            <Textarea required 
            id="course"
            value={course}
            onChange={e=>setCourse(e.target.value)}
            placeholder={"Explain the Course ..."}
            focusBorderColor='yellow.500'
            />
            </Box>

           

            <Button my={'4'} colorScheme={'yellow'} type="submit">
                Send Email
            </Button>

            <Box my={'4'}>
See Avaialbale Courses ? <Link to='/courses'>
    <Button isLoading={loading} colorScheme={'yellow'} variant={'link'}>
       Click 
    </Button>{ " " }
    here
</Link>
</Box>

        </form>
        </VStack>
    </Container>
  )
}
