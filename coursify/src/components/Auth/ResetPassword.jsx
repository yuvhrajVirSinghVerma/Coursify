import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../redux/actions/profile'
import { toast } from 'react-hot-toast'

export default function ResetPassword() {
    const[password,setPassword]=useState("")

    const params=useParams()//it gives token which we pass from router
    console.log(params)
    const navigate=useNavigate()
    const{loading,message,error}=useSelector(state=>state.profile)




    const dispatch=useDispatch()
    const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(resetPassword(params.token,password));
    }

useEffect(()=>{
  if(error){
    toast.error(error)
    dispatch({type:'clearError'})
  }
  if(message){
    toast.success(message)
    dispatch({type:'clearMessage'})
    navigate('/login')
  }
},[dispatch, error, message])
  return (
    <Container py={"16"} height="90vh">
        <form onSubmit={submitHandler}>
            <Heading 
            children="Reset Password"  
            my="16" 
            textTransform={"upper"}
            textAlign={['center','left']}
            />

            <VStack>
            <Input required 
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder={"New Password"}
            type="password"
            focusBorderColor='yellow.500'
            />

            <Button isLoading={loading} type='submit' w={"full"} colorScheme="yellow">
               Reset Password
                </Button>
            </VStack>
        </form>
    </Container>
  )
}
