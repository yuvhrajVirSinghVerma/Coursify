import React, { useEffect, useState } from 'react'
import {Button, Container, Heading, Input, VStack} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../redux/actions/profile'
import toast, { Toaster } from 'react-hot-toast';

export default function ChangePassword() {
    const[oldPassword,setOldPassword]=useState("")
    const[newPassword,setNewPassword]=useState("")

    const {loading,message,error}=useSelector(state=>{
      console.log(state)
      return state.profile//debug this tom
    }
      )

    const dispatch=useDispatch();

    useEffect(()=>{

      if(error){
        toast.error(error);
        dispatch({type:'clearError'})
      }
      if(message){
        toast.success(message);
        dispatch({type:'clearMessage'})
      }
    },[dispatch,error,message])

    const submitHandler=(e)=>{
      e.preventDefault();

      console.log("submit")
      dispatch(changePassword(oldPassword,newPassword))
      
    }
  return (
    <Container py={'16'} minH={'90vh'}>
        <form onSubmit={submitHandler}>

        <Heading children={"Change Password"}
            my='16'
            textAlign={['center','left']}
            textTransform={'uppercase'}
            />

            <VStack spacing={'8'}>
            <Input 
            required 
            id="password"
            value={oldPassword}
            onChange={e=>setOldPassword(e.target.value)}
            placeholder={"Old PassWord"}
            type="password"
            focusBorderColor='yellow.500'
            />

            <Input 
            required 
            id="password"
            value={newPassword}
            onChange={e=>setNewPassword(e.target.value)}
            placeholder={"New PassWord"}
            type="password"
            focusBorderColor='yellow.500'
            />

            <Button w="full" colorScheme={'yellow'} type={'submit'} isLoading={loading}>
                Change
            </Button>
            </VStack>
        </form>
    </Container>
  )
}
