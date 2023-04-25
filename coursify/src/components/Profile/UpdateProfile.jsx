import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Container, Heading, Input, VStack} from '@chakra-ui/react'
import { updateProfile } from '../../redux/actions/profile'
import { loadUser } from '../../redux/actions/user'
import { useNavigate } from 'react-router-dom'
export default function UpdateProfile() {
    const[Name,setName]=useState("")
    const[email,setEmail]=useState("")
    const dispatch=useDispatch()
    const{loading}=useSelector(state=>state.profile)
    const navigate=useNavigate()
    const submitHandler=async(e)=>{
      e.preventDefault();
       await dispatch(updateProfile(Name,email))
       dispatch(loadUser())
       navigate("/profile")
      
    }
  return (
    <Container py={'16'} minH={'90vh'}>
        <form onSubmit={submitHandler}>

        <Heading children={"Update Profile"}
            my='16'
            textAlign={['center','left']}
            textTransform={'uppercase'}
            />

            <VStack spacing={'8'}>
            <Input 
            value={Name}
            onChange={e=>setName(e.target.value)}
            placeholder={"Name"}
            type="text"
            focusBorderColor='yellow.500'
            />

            <Input 
            required 
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder={"Email"}
            type="email"
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
