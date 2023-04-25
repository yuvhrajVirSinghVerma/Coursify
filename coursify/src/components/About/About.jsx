import { Avatar, Box, Button, Container, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiSecurePaymentFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import introVideo from '../../assets/Videos/intro.mp4'
import termsAndCondition from '../../assets/Docs/termsAndCondition'
const Founder=()=>{
    return (
        <Stack direction={['column','row']} spacing={['4','16']} padding={'8'}>
            <VStack>
                <Avatar boxSize={['40','48']}/>
                <Text children="Co-Founder" opacity={0.7}/>
            </VStack>

                <VStack justifyContent={'center'} alignItems={['center','flex-start']}>
                    <Heading children={"Yuvhraj"} size={['md','xl']}/>
                    <Text 
                    textAlign={['center','left']}
                    children={"Hi I am A Full Stack Developer"}/>
                </VStack>
        </Stack>
    )
}

const VideoPlayer=()=>{
    return(
        <video 
          autoPlay 
          muted
          controls 
          src={introVideo} 
          controlsList='nodownload nofullscreen noremoteplayback'
          disablePictureInPicture
          disableRemotePlayback
          
          ></video>
    )
}

const TandC=({termsAndCondition})=>(
    <Box>
        <Heading size={'md'} my='4' textAlign={'center'} children={"Terms & Condition"}/>

        <Box height={'sm'} p='4' overflowY={'scroll'}>
            <Text textAlign={['center','left']} letterSpacing='widest' fontFamily={'heading'}>
                {termsAndCondition}
            </Text>
            <Heading my='4' size={'xs'} children={'Refund only apllicable for cancellation within 7 days'}/>

        </Box>
    </Box>
)
export default function About() {
  return (
    <Container maxW={"container.lg"} padding='16' boxShadow={'lg'}>
        <Heading children="About Us" textAlign={['center','left']}/>
        <Founder/>

        <Stack m='8' direction={['column','row']} alignItems='center'>
            <Text fontFamily={'cursive'} m='8' textAlign={['center','left']}>
                We are a video streaming platform available for premium users
            </Text>

            <Link to='/subscribe'>

                <Button variant={'ghost'} colorScheme='yellow'>
                    Check Out Our Plan
                </Button>
            </Link>

        </Stack>

<VideoPlayer/>
<TandC termsAndCondition={termsAndCondition}/>
<HStack my='4' p='4'>
    <RiSecurePaymentFill/>
    <Heading 
    size={'xs'}
    fontFamily={'sans-serif'}
    textTransform='uppercase'
    children={'Payment is secured by Razorpay'}/>
</HStack>
        
    </Container>
  )
}
