import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../redux/actions/profile'
import { toast } from 'react-hot-toast'

export default function ForgetPassword() {
    const[email,setEmail]=useState("")
const dispatch=useDispatch()
    const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(forgetPassword(email));
    }
    const{loading,message,error}=useSelector(state=>state.profile)
useEffect(()=>{
  if(error){
    toast.error(error)
    dispatch({type:'clearError'})
  }
  if(message){
    toast.success(message)
    dispatch({type:'clearMessage'})
  }
},[error,message,dispatch])
  return (
    <Container py={"16"} height="90vh">
        <form onSubmit={submitHandler}>
            <Heading 
            children="Forget Password"  
            my="16" 
            textTransform={"upper"}
            textAlign={['center','left']}
            />

            <VStack>
            <Input required id="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder={"xyz@gmail.com"}
            type="email"
            focusBorderColor='yellow.500'
            />

            <Button isLoading={loading}  type='submit' w={"full"} colorScheme="yellow">
                Send Reset Link
                </Button>
            </VStack>
        </form>
    </Container>
  )
}
