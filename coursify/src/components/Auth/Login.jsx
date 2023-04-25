import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import{useDispatch} from 'react-redux'
import { login } from '../../redux/actions/user.js'

export default function Login() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const dispatch=useDispatch()

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
  return (
   <Container height={"95vh"}>
    <VStack height={"full"}  justifyContent={"center"} spacing={'16'}>
        <Heading children={"Welcome to Coursify"}/>

        <form style={{width:'100%'}} onSubmit={submitHandler}>
            <FormLabel htmlFor='email' children="Email Address"/>
            <Box my={'4'}>
            <Input required id="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            placeholder={"xyz@gmail.com"}
            type="email"
            focusBorderColor='yellow.500'
            />
            </Box>

            <Box my={'4'}>
            <FormLabel htmlFor='password' children="Password"/>
            <Input required id="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            placeholder={"Enter Your PassWord"}
            type="password"
            focusBorderColor='yellow.500'
            />

            </Box>
            <Box my={'4'}>
            <Link to='/forgetpassword'>
                <Button fontSize={'sm'} variant="link">
                    Forget PassWord?
                </Button>
            </Link>
            </Box>

            <Button my={'4'} colorScheme={'yellow'} type="submit">
                Login
            </Button>

            <Box my={'4'}>

                New User ? <Link to='/register'>
                    <Button colorScheme={'yellow'} variant={'link'}>
                        Sign Up
                    </Button>{ " " }
                    here
                </Link>
            </Box>
        </form>

    </VStack>
   </Container>
  )
}
