import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../redux/actions/user'
import { useDispatch } from 'react-redux'

//we use this is many components
export const fileuploadcss={
    cursor:"pointer",marginLeft:'-5%',
    width:"110%",
    border:"none",
    height:"100%",
    color:"#ECC94B",
    backgroundColor:"white"
}
const fileuploadStyle={
    "&::file-selector-button":fileuploadcss
}
export default function Register() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[imagePrev,setImagePrev]=useState("")
    const[image,setImage]=useState("")

    const dispatch=useDispatch();

    const changeAvatarHandler=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend=()=>{
            console.log(reader)
            setImagePrev(reader.result)
            setImage(file)
        }

    }

    const submithandler=(e)=>{
        e.preventDefault()
        const myform=new FormData();
        myform.append('name',name);
        myform.append('email',email);
        myform.append('password',password);
        myform.append('file',image);//we have to send this to multer by name "file"

        dispatch(register(myform))
    }
  return (
   <Container height={"95vh"}>
    <VStack height={"full"}  justifyContent={"center"} spacing={'16'}>
        <Heading children={"Register"} textTransform={"Uppercase"}/>

        <form style={{width:'100%'}} onSubmit={submithandler}>
        <Box my={'4'} display="flex" justifyContent={"center"}>
            <Avatar src={imagePrev} size="2xl"/>
           </Box>
            <Box my={'4'}>
            <FormLabel htmlFor='Name' children="Name"/>
            <Input required id="Name"
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
            <FormLabel htmlFor='chooseAvatar' children="Choose Avatar"/>
            <Input
             required
             accept='image/*'
             id="chooseAvatar"
            type="file"
            focusBorderColor='yellow.500'
            css={fileuploadStyle}
            onChange={changeAvatarHandler}
            />
            </Box>

           

            <Button my={'4'} colorScheme={'yellow'} type="submit">
                Sign Up
            </Button>

            <Box my={'4'}>

               Already Signed Up ? <Link to='/login'>
                    <Button colorScheme={'yellow'} variant={'link'}>
                        Login 
                    </Button>{ " " }
                    here
                </Link>
            </Box>
        </form>

    </VStack>
   </Container>
  )
}
