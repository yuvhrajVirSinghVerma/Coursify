import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import {ColorModeSwitcher} from '../../../ColorModeSwitcher'
import {RiMenuFill,RiLogoutBoxLine, RiDashboardFill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../redux/actions/user'

const LinkButton=({url='/',title='Home',onClose})=>(
    <Link to={url} onClick={onClose}>
                <Button variant={'ghost'}>{title}</Button>
            </Link>
)


export default function Header({isAuthenticated=false,user}) {
    const {isOpen,onOpen,onClose}=useDisclosure()//provided by charka ui 
    //onopen set true to isopen
    //onclose set false to isopen 

    // const isAuthenticated=false
    // const user={
    //     role:'admin'
    // }

    const dispatch=useDispatch()
    const logoutHandler=()=>{
        console.log('logout')
        onClose()
        dispatch(logOut())
    }
  return (
    <>
    <ColorModeSwitcher/>

    <Button 
    zIndex={'overlay'}
    colorScheme={"yellow"} width={'12'} height={'12'}rounded='full' position={"fixed"} top="6" left="6"
    onClick={onOpen}
    >
        <RiMenuFill/>
    </Button>

    <Drawer placement='left' isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter={'blur(3px)'}/>
        <DrawerContent>
            <DrawerHeader borderBottomWidth={'1px'}>Coursify</DrawerHeader>

            
            <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'}>
            <LinkButton onClose={onClose} url='/' title={'Home'}/>
            <LinkButton onClose={onClose} url='/Courses' title={'Browse All Courses'}/>
            <LinkButton onClose={onClose} url='/request' title={'Request a course'}/>
            <LinkButton onClose={onClose} url='/contact' title={'Contact Us'}/>
            <LinkButton onClose={onClose} url='/about' title={'About'}/>


            <HStack justifyContent={"space-evenly"} position={'absolute'} bottom={'2rem'} width='80%' >
                {isAuthenticated?(<>
                <VStack>
                    <HStack>
                    <Link to='/profile' onClick={onClose}>
                    <Button variant={'ghost'} colorScheme={'yellow'}>Profile</Button>
                </Link>
              
                    <Button variant={'ghost'}  colorScheme={'yellow'} onClick={logoutHandler} >
                        <RiLogoutBoxLine/>
                        Log Out
                        </Button>
                    </HStack>
                    {/* //if admin */}
                    {user && user.role==='admin'
                 && (<Link to='/admin/dashboard' onClick={onClose}>
                 <Button colorScheme={'purple'} variant="ghost">
                     <RiDashboardFill style={{margin:'4px'}}/>
                     DashBoard
                 </Button>
             </Link>)
                
                }
                </VStack>
                </>)
                :
                (<>
                <Link to='/login' onClick={onClose}>
                    <Button colorScheme={'yellow'}>Login</Button>
                </Link>
                <p>OR</p>
                <Link to='/register' onClick={onClose}>
                    <Button colorScheme={'yellow'}>Sign Up</Button>
                </Link>
                </>)
}
            </HStack>

            
        </VStack>
            </DrawerBody>
        </DrawerContent>


        
    </Drawer>

    </>
  )
}

