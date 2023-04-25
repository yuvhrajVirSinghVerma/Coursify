import React, { useEffect, useState } from 'react'
import cursor from '../../../assets/Images/cursor.png'
import { Box, Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
import SideBar from '../SideBar'
import { fileuploadcss } from '../../Auth/Register'
import { createCourse } from '../../../redux/actions/admin'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
export default function CreateCourse() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [createdBy, setCreatedBy] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [imagePrev, setImagePrev] = useState("")
  const categories = ["Web Development", "Data Structure", "AI", "APP DEVELOPMENT"]
  const fileuploadStyle={
    "&::file-selector-button":fileuploadcss
}
const dispatch=useDispatch()
const {loading,error,message}=useSelector(state=>state.admin)
const changeImageHandler=(e)=>{
  const file=e.target.files[0];
  const reader=new FileReader()

  reader.readAsDataURL(file)

  reader.onloadend=()=>{
      console.log(reader)
      setImagePrev(reader.result)
      setImage(file)
  }

}

const submitHandler=(e)=>{
  e.preventDefault();
  const myform=new FormData();
  console.log(title,description,createdBy,image,category)
  myform.append('title',title)
  myform.append('description',description)
  myform.append('createdBy',createdBy)
  myform.append('file',image)
  myform.append('category',category)

  dispatch(createCourse(myform));
}

useEffect(()=>{
  if(error){
    toast.error(error)
    dispatch({type:'clearError'})
  }
  if(message){
    toast.success(message)
    dispatch({type:'clearMessage'})

  }
},[dispatch,error,message])
  return (
    <Grid minH={"100vh"} templateColumns={['1fr', '5fr 1fr']}
      css={{ cursor: `url(${cursor}), default` }}
    >
      <Container
        py='16'
      >
        <form onSubmit={submitHandler}>
          <Heading textTransform={'uppercase'} children={"Create Course"}
            my='16'
            textAlign={['center', 'left']}
          />
          <VStack
            m='auto'
            spacing={'8'}
          >
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={"Title"}
              type="text"
              focusBorderColor='purple.300'
            />

            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={"Description"}
              type="text"
              focusBorderColor='purple.300'
            />

            <Input
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder={"Creator Name"}
              type="text"
              focusBorderColor='purple.300'
            />

            <Select focusBorderColor='purple.300'
              value={category}
              onChange={e => setCategory(e.target.value)}

            >
              <option value="">
                Category
              </option>
              {categories.map((item, idx) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                )
              })}
            </Select>

            <Input
             required
             accept='image/*'
             id="chooseAvatar"
            type="file"
            focusBorderColor='purple.300'
            css={{
              "&::file-selector-button":{
                ...fileuploadcss,color:'purple'
              }
            }}
            onChange={changeImageHandler}
            />

            {imagePrev && (
              <Image src={imagePrev} boxSize={'64'} objectFit={"contain"} />
            )}

            <Button isLoading={loading}  w={'full'} colorScheme='purple' type='submit'>Create</Button>

          </VStack>
        </form>

      </Container>
      <SideBar />
    </Grid>
  )
}
