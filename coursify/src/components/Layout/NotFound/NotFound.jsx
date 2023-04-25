import React from 'react'
import {Button, Container,Heading, VStack} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import { RiErrorWarningFill } from 'react-icons/ri'
export default function NotFound() {
  return (
   <Container h='90vh' p='16'>
    <VStack 
    justifyContent={'center'} 
    h='full' 
    spacing='4' 
   >
    <RiErrorWarningFill size={'5rem'}/>
    <Heading >Page Not Found</Heading>

<Link to='/'>
    <Button variant={'ghost'}>
        Go to Home
    </Button>
</Link>

    </VStack>
   </Container>
  )
}
