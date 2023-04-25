import { Box, Button, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { fileuploadcss } from '../../Auth/Register'

function VideoCard({ title, description, num, lectureId, courseId, deleteButtonHandler,loading}) {
  return (
    <Stack direction={['column', 'row']}
      my='8'
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button isLoading={loading} color={'purple.600'} onClick={() => deleteButtonHandler(courseId, lectureId)}>
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  )
}
export default function CourseDetailModal({ isOpen, onClose, id, deleteButtonHandler, addLectureButtonHandler, courseTitle, 
  lectures = [],loading }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [video, setVideo] = useState("")
  const [videoPrev, setVideoPrev] = useState("")
  const changeVideoHandler=(e)=>{
    const file=e.target.files[0];
    const reader=new FileReader()
  
    reader.readAsDataURL(file)
  
    reader.onloadend=()=>{
        console.log(reader)
        setVideoPrev(reader.result)
        setVideo(file)
    }
  
  }

  const handleClose=()=>{
    onClose()
    setTitle("")
    setDescription("")
    setVideoPrev("")
    setVideo("")
  }
  return (
    <Modal isOpen={isOpen} size='full' onClose={handleClose} scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton  />

        <ModalBody p='16'>
          <Grid templateColumns={['1fr', '3fr 1fr']} >
            <Box px={['0', '16']}>
              <Box my='5'>
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
              </Box>

              <Heading children={'Lectures'} size={'lg'} />
             {lectures.map((item,idx)=>{
              return(
                <VideoCard
                key={idx}
                title={item.title}
                description={item.description}
                num={idx+1}
                lectureId={item._id}
                courseId={id}
                deleteButtonHandler={deleteButtonHandler}
                loading={loading}
              />
              )
             })}
            </Box>
            <Box>
              <form onSubmit={e => addLectureButtonHandler(e, id, title, description, video)}>
                <VStack spacing={'4'}>
                  <Heading children={'Add Lectures'} size={'md'} textTransform={'uppercase'} />
                  <Input focusBorderColor='purple.300' placeholder='Title' value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <Input focusBorderColor='purple.300' placeholder='Description' value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <Input
                    required
                    accept='video/mp4'
                    type="file"
                    focusBorderColor='purple.300'
                    css={{
                      "&::file-selector-button": {
                        ...fileuploadcss, color: 'purple'
                      }
                    }}
                    onChange={changeVideoHandler}
                  />

                  {videoPrev && (
                    <video controlsList='nodownload' controls src={videoPrev}>

                    </video>
                  )}
                  <Button w='full' colorScheme='purple' type='submit' loading={loading} >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>

          </Grid>

        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose} >close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
