import { Box,Heading,HStack,Stack, VStack } from '@chakra-ui/react'
import React from 'react'

import { DiGithub } from 'react-icons/di'
import { TiSocialInstagramCircular, TiSocialYoutubeCircular} from 'react-icons/ti'

export default function Footer() {
  return (
  <Box padding="4" bg="blackAlpha.900" minH={'10vh'}>
    <Stack direction={["column","row"]}>

        <VStack alignItems={['center','flex-start']} width='full'>
            <Heading children="All Rights Reserved" color={"white"}/>
            <Heading children="@ Yuvhraj" color={"yellow.400"} fontFamily={"body"} size={"sm"}/>
            
            
        </VStack>
        <HStack spacing={["2","10"]} justifyContent="center" color={"white"} fontSize={'50'}>
                <a href='' target={'_blank'}>
                    <TiSocialYoutubeCircular/>
                </a>

                <a href='' target={'_blank'}>
                    <TiSocialInstagramCircular/>
                </a>
                <a href='' target={'_blank'}>
                    <DiGithub/>
                </a>
            </HStack>
    </Stack>
  </Box>
  )
}
