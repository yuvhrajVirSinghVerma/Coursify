import React, { useEffect, useState } from 'react'
import {Button, Container, Heading, HStack, Image, Input, Stack, Text, VStack} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getAllCourses } from '../../redux/actions/course'
import toast from 'react-hot-toast'
import {addToPlayList, loadUser} from '../../redux/actions/user'

const CourseCard=({views,title,imageSrc,id,addToPlayListHandler,creator,description,leactureCount,loading})=>{
    return (
        <VStack className='course' alignItems={["center","flex-start"]}>
        <Image src={imageSrc} boxSize="60" objectFit={"contain"}/>
        <Heading textAlign={["center","left"]} maxW={"200px"} fontFamily={"sans-serif"}
        noOfLines={3}
        size={"sm"}
        children={title}
        />
        <Text noOfLines={2} children={description}/>
        
        <HStack>
        <Text fontWeight={"bold"} 
        textTransform="uppercase"
        children={"creator"}/>

        <Text 
        fontFamily={'bold'}
        textTransform="uppercase"
        children={creator}/>
            
        </HStack>

        <Heading textAlign={"center"}
        size="xs"
        children={`Lectures - ${leactureCount}`}
        textTransform="uppercase"
        />

        <Heading
        size="xs"
        children={`Views - ${views}`}
        textTransform="uppercase"
        />

        <Stack
        direction={['column','row']}
        alignItems="center"
        >
            <Link to={`/course/${id}`}>
            <Button  colorScheme={'yellow'}>
                Watch Now
            </Button>
            </Link>

            <Button
            variant={'ghost'}
            colorScheme="yellow"
            onClick={()=>addToPlayListHandler(id)}
            isLoading={loading}
            >
                Add To PlayList
            </Button>

        </Stack>
        </VStack>
    )
}
export default function Coures() {
    const[keyword,setKeyword]=useState("")
    const[category,setCategory]=useState()
    const {loading,courses,error,message }=useSelector(state=> {
        // console.log("courses ",state)
        return state.courses
    })
    const dispatch=useDispatch()
    useEffect(()=>{
        console.log("calles")
        dispatch(getAllCourses(category,keyword))

        if(error){
            toast.error(error)
            dispatch({type:"clearError"})
        }
        if(message){
            toast.success(message);
            dispatch({type:'clearMessage'})
        }
    },[category,keyword,dispatch,error,message])

    const categories =["Web Dev", "Data Structure","AI","APP DEVELOPMENT"]

    const addToPlayListHandler=async(courseId)=>{
        console.log("added to playlist",courseId)

        await dispatch(addToPlayList(courseId))

        dispatch(loadUser())
    }
  return (
    <Container minH={"95vh"} maxW="container.lg" paddinngY={'8'}>
        <Heading children="All Courses" m={'8'}/>
        <Input value={keyword} 
        onChange={e=> setKeyword(e.target.value)}
        placeholder={'Search a course...'}
        type={'text'}
        focusBorderColor={'yellow.500'}
        />

        <HStack overflowX={'auto'} paddinngY={'8'} css={{"&::-webkit-scrollbar":{
            display:'none'
        }}}>
           {categories.map((item,index)=>(
             <Button  key={index} minW={'60'} onClick={()=>setCategory(item)}>
             <Text children={item}/>

         </Button>
           ))}
        </HStack>

        <Stack
        direction={['column','row']}
        flexWrap="wrap"
        justifyContent={['flext-start','space-evenly']}
        alignItems={['center','flex-start']}
        >
            {courses.length>0 ? courses.map((item,idx)=>(
                <CourseCard 
                key={item._id}
            title={item.title}
            description={item.description}
            views={item.views}
            imageSrc={item.poster.url}
            creator={item.createdBy}
            leactureCount={item.numOfVideos}
            addToPlayListHandler={addToPlayListHandler}
            id={item._id}
            loading={loading}
            />
            ))
            :<Heading  mt={4} children={"Course Not Found"} />
        }
            
        </Stack>

    </Container>
  )
}
