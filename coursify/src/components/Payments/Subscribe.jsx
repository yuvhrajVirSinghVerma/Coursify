import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import{useDispatch, useSelector} from 'react-redux'

import { server } from '../../redux/store'
import { buySubscription } from '../../redux/actions/user'
import logo from '../../assets/Images/logo.png'

import {toast} from 'react-hot-toast'
export default function Subscribe({user}) {
    const dispatch=useDispatch()
    const [key,setKey]=useState("")

    const {loading,error,subscriptionId}=useSelector(state=>state.subscription)
    const {error:CourseLectureError}=useSelector(state=> { 
        console.log(state.courses) 
        return state.courses
    })
    const subscribeHandler=async()=>{

        const {data}=await axios.get(`${server}/razorpaykey`);

        setKey(data.key)

        dispatch(buySubscription())
    }

    useEffect(()=>{
    if(error){
        toast.error(error)
        dispatch({type:'clearError'})
    }
    if(CourseLectureError){
        toast.error(CourseLectureError)
        dispatch({type:'clearError'})
    }
    if(subscriptionId){
        const openPopUp=()=>{
            const options={
                key:key,
                name:"coursify",
                description:"Get Access to all Premium content",
                image:logo,
                subscription_id:subscriptionId,
                callback_url:`${server}/paymentverification`,
                prefill:{
                    name:user.name,
                    email:user.email,
                    contact:""
                },
                theme:{
                    color:'#FFC800'
                }
            }

            const razor=new window.RazorPay(options)//we can access this becoz we have added a script provided by razorpay in index.html
            razor.open()
        }
        openPopUp()
    }
    },[dispatch,error,user.name,user.email,key,subscriptionId,CourseLectureError])

  return (
    <Container h='90vh' p='16'>
        <Heading children='Welcome' my='8' textAlign={'center'}/>
        <VStack boxShadow={'lg'} alignItems='stretch' borderRadius={'lg'} spacing='0'>

            <Box bg='yellow.400' p={'4'} css={{borderRadius:"8px 8px 0 0"}}>
                <Text  children={'Pro Pack - $299'}/>
            </Box>

            <Box p='4'>
                <VStack textAlign={'center'} px='8' mt='4' spacing={'8'}>
                    <Text children={'Join Pro Pack and get acess to all content.'}/>

                    <Heading size={'md'} children={"$299 Only"}/>
                </VStack>
                
                <Button isLoading={loading} onClick={subscribeHandler} my='8' w='full' colorScheme={'yellow'}>
                    Buy Now
                </Button>
            </Box>

            <Box bg='blackAlpha.600' p='4' css={{borderRadius:"0 0  8px 8px"}}>
            <Heading color="white" textTransform={"uppercase"} size={'sm'} children={"100% refund at cancelation"}/>

            <Text fontSize={'xs'} color='white' children={"Terms And Condition Apply"}/>

            </Box>
        </VStack>
    </Container>
  )
}
