import {
    Avatar,
    Button,
    Container,
    Heading,
    HStack,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import {fileuploadcss} from '../Auth/Register'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../redux/actions/profile';
import { cancelSubscription, loadUser, removeFromPlayList } from '../../redux/actions/user';
import toast, { Toaster } from 'react-hot-toast';

const ChangePhotoBox = ({isOpen,onClose,ChangeImageSubmitHandler,loading}) => {

    const[imagePrev,setImagePrev]=useState("")
    const[image,setImage]=useState("")
   

    const changeImage=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend=()=>{
            console.log(reader)

            setImagePrev(reader.result)
            setImage(file)
        }

    }


    const closeHandler=()=>{
        onClose();
        setImagePrev("")
        setImage()
    }

   
    return (
        <Modal isOpen={isOpen} onClose={closeHandler}>
            <ModalOverlay backdropFilter={'blur(10px)'} />
            <ModalContent>
                <ModalHeader>Change Photo</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Container>
                        <form onSubmit={(e)=>ChangeImageSubmitHandler(e,image)}>
                            <VStack spacing={'8'}>
                                {imagePrev && <Avatar src={imagePrev} boxSize={'48'}/>}

                                <Input 
                                type='file'  
                                css={{"&::file-selector-button":fileuploadcss}}
                                onChange={changeImage}
                                />

                                <Button w='full' colorScheme={'yellow'} type={'submit'}
                               isLoading={loading}
                                >
                                    Change
                                </Button>

                            </VStack>
                        </form>
                    </Container>
                </ModalBody>

                <ModalFooter>
                    <Button mr='3' onClick={closeHandler}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            
        </Modal>
    );
};
export default function Profile({user}) {
    //temp obj we will get this from backend
    // const user = {
    //     name: user.name,
    //     email: user.email,
    //     createdAt: user.createdAt.toString(),
    //     role: user.role,
    //     subscription: {
    //         status: user.,
    //     },
    //     playlist: [
    //         {
    //             course: 'Course Name',
    //             poster: 'url',
    //         },
    //     ],
    // };

    const{isOpen,onClose,onOpen}=useDisclosure();

    const dispatch=useDispatch()

    const{loading,message,error}=useSelector(state=>{
       return state.profile})

    const{loading:subscriptionLoading,message:subscriptionMessage,error:subscriptionError}=useSelector(state=> state.subscription)

    useEffect(()=>{
        console.log("lllllllll",message)
        if(error){
          toast.error(error);
          dispatch({type:'clearError'})
        }
        if(message){
           
          toast.success(message);
          dispatch({type:'clearMessage'})
        }

        if(subscriptionError){
            toast.error(subscriptionError);
            dispatch({type:'clearError'})
          }
          if(subscriptionMessage){
            toast.success(subscriptionMessage);
            dispatch({type:'clearMessage'})

            dispatch(loadUser())
          }
      },[dispatch,error,message,subscriptionMessage,subscriptionError])
    const removeFromPlayListHandler = async id => {
        console.log(id);
       await dispatch(removeFromPlayList(id))
       dispatch(loadUser())
    };

    const ChangeImageSubmitHandler=async (e,image)=>{
        e.preventDefault();
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
        console.log(image)
    }


    const cancelSubscriptionHandler=()=>{
        dispatch(cancelSubscription())
    }

    return (
        <Container minH={'95vh'} maxW="container.lg" py={'8'}>
            <Heading children={'Profile'} m="8" textTransform={'uppercase'} />
            <Stack
                justifyContent={'flex-start'}
                direction={['column', 'row']}
                alignItems={'center'}
                spacing={['8', '16']}
                padding="8"
            >
                <VStack>
                    <Avatar boxSize={'48'} src={user.avatar.url} />
                    <Button onClick={onOpen} colorScheme={'yellow'} variant={'ghost'} >
                        Change Photo
                    </Button>
                </VStack>

                <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
                    <HStack>
                        <Text children={'Name'} fontWeight={'bold'} />
                        <Text children={user.name} />
                    </HStack>

                    <HStack>
                        <Text children={'Email'} fontWeight={'bold'} />
                        <Text children={user.email} />
                    </HStack>

                    <HStack>
                        <Text children={'Created At'} fontWeight={'bold'} />
                        <Text children={user.createdAt.split('T')[0]} />
                    </HStack>

                    {user.role !== 'admin' && (
                        <HStack>
                            <Text children={'Subscription'} fontWeight={'bold'} />
                            {user.subscription && user.subscription.status === 'active' ? (
                                <Button isLoading={subscriptionLoading} onClick={cancelSubscriptionHandler} color={'yellow.500'} variant={'unstyled'}>
                                    Cancel Subscription
                                </Button>
                            ) : (
                                <Link to="/subscribe">
                                    <Button colorScheme={'yellow'}>Subscribe</Button>
                                </Link>
                            )}
                        </HStack>
                    )}

                    <Stack direction={['column', 'row']} alignItems={'center'}>
                        <Link to="/updateprofile">
                            <Button>Update Profile</Button>
                        </Link>

                        <Link to="/changepassword">
                            <Button>Change Password</Button>
                        </Link>
                    </Stack>
                </VStack>
            </Stack>

            <Heading children={'PlayList'} size={'md'} my="8" />
            {user.playlist.length > 0 && (
                <Stack
                    direction={['column', 'row']}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    p="4"
                >
                    {user.playlist.map((ele, idx) => (
                        <VStack w="48" m="2" key={ele.course}>
                            <Image boxSize={'full'} objectFit={'contain'} src={ele.poster} />

                            <HStack>
                                <Link to={`/course/${ele.course}`}>
                                    <Button variant={'ghost'} colorScheme={'yellow'}>
                                        Watch Now
                                    </Button>
                                </Link>

                                <Button isLoading={loading} onClick={() => removeFromPlayListHandler(ele.course)}>
                                    <RiDeleteBin7Fill />
                                </Button>
                            </HStack>
                        </VStack>
                    ))}
                </Stack>
            )}

            <ChangePhotoBox 
            isOpen={isOpen}
            onClose={onClose}
            ChangeImageSubmitHandler={ChangeImageSubmitHandler}
            loading={loading}
            />
        </Container>
    );
}
