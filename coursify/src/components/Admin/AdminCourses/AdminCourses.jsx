import React, { useEffect, useState } from 'react'
import cursor from '../../../assets/Images/cursor.png'
import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import SideBar from '../SideBar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseDetailModal from './CourseDetailModal'
import { useDispatch, useSelector } from 'react-redux'
import {getAllCourses, getCourseLectures} from '../../../redux/actions/course'
import { addLectures, deleteCourse, deleteLecture } from '../../../redux/actions/admin'
import toast from 'react-hot-toast'

function Row({ item, courseDetailsHandler, deleteButtonHandler,loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>

      <Td>
        <Image src={item.poster.url} />
      </Td>

      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailsHandler(item._id, item.title)}
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            View Lectures
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  )
}
export default function AdminCourses() {
  // const courses = [{
  //   _id: "adfg",
  //   title: 'React',
  //   category: 'web dev',
  //   poster: {
  //     url: "oepeef"
  //   },
  //   createdBy: "yuvi",
  //   views: '123',
  //   numOfVideos: 10
  // }]

  const{courses,lectures}=useSelector(state=>state.courses)
  const{loading,error,message}=useSelector(state=>state.admin)
  const { isOpen, onClose, onOpen } = useDisclosure();
  const[courseId,setCourseId]=useState("")
  const[courseTitle,setCourseTitle]=useState("")
  const dispatch=useDispatch()
  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
  
    }
    dispatch(getAllCourses())
  },[dispatch,error,message])


  const courseDetailsHandler = (courseId,title) => {
    onOpen()
    setCourseId(courseId)
    setCourseTitle(title)
    dispatch(getCourseLectures(courseId))
  }
  const deleteButtonHandler = (courseId) => {
    dispatch(deleteCourse(courseId))
  }
  const deleteLectureButtonHandler = async(courseId, lectureId) => {
    await dispatch(deleteLecture(courseId,lectureId))
    dispatch(getCourseLectures(courseId))
  }
  const addLectureButtonHandler = async(e,courseId, title,description,video) => {
    e.preventDefault()
    const myform=new FormData();
    myform.append('title',title)
    myform.append('description',description)
    myform.append('file',video)

   await dispatch(addLectures(courseId,myform))
   dispatch(getCourseLectures(courseId))

  }
  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my="16"
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available courses in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses.map(item => (
                <Row
                courseDetailsHandler={courseDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseDetailModal
        isOpen={isOpen}
        onClose={onClose}
          deleteButtonHandler={deleteLectureButtonHandler} 
          addLectureButtonHandler={addLectureButtonHandler} 
          id={courseId}
          courseTitle={courseTitle}
          lectures={lectures}
          loading={loading}
        />
      </Box>

      <SideBar />
    </Grid>
  )
}
