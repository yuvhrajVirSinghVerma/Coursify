import React from 'react'
import {Box, Button, Heading, HStack, Image, Stack, Text, VStack} from "@chakra-ui/react"
import {Link} from 'react-router-dom'
import './home.css'
import vg from '../../assets/Images/bg.png'
import introVideo from '../../assets/Videos/intro.mp4'
import {CgGoogle,CgYoutube} from 'react-icons/cg'
import {SiCoursera,SiUdemy} from 'react-icons/si'
import {DiAws} from 'react-icons/di'
export default function Home() {
  return (
    <section  className='Home'>
        <div className="container">
            <Stack direction={["column","row"]}
            height="100%"
            justifyContent={["center","space-between"]}
            alignItems="center"
            spacing={['16','56']}
            >

{/* aligns items column wise */}
              <VStack width={'full'} alignItems={["center","flex-end"]} spacing={'8'}>
                <Heading children='Welcome To Coursify'/>
                <Text fontSize={"2xl"} textAlign={['center','left']} children='best website you will ever find'/>

                <Link to='/courses'>
                <Button size={'lg'} colorScheme="yellow">Enroll Now</Button>
                </Link>
              </VStack>

              <Image className='vector-graphics' boxSize={"md"} src={vg} objectFit={'contain'}/>

            </Stack>
        </div>


        <Box padding={'8'} bg="blackAlpha.800">
          <Heading children={"Our Brands"} textAlign={"center"} fontFamily="body" color="yellow.400"/>
          <HStack className='brandsBanner' justifyContent={'space-evenly'} marginTop="4">
            <CgGoogle/>
            <CgYoutube/>
            <SiCoursera/>
            <SiUdemy/>
            <DiAws/>
          </HStack>
        </Box>

        <div className="container2">
          <video 
          autoPlay 
          controls 
          src={introVideo} 
          controlsList='nodownload nofullscreen noremoteplayback'
          disablePictureInPicture
          disableRemotePlayback />

        </div>
    </section>
  )
}
