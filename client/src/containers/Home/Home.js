import { Backdrop, Container, Grid, Grow, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useLocation } from 'react-router-dom'
import { Add} from '@mui/icons-material'

import { getPosts } from '../../action/posts'
import './styles.css'
import {Form,Paginate,Posts} from '../../components'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const Home = () => {

    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
    const query = useQuery();
    const page = query.get('page')  || 1;
    const searchQuery = query.get('searchQuery');
    const [open, setOpen] = useState(false)
    const {posts,isLoading} = useSelector((state)=> state.posts)
    const user = localStorage.getItem('profile')

    const toggleOpen = () => {
      setOpen(!open)
    }
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId, dispatch])

  const CreateButton = ({Class}) => {
    return(
      <button onClick={toggleOpen} className={`createButton ${Class}`}>
        <Add fontSize='large' />Create Post
      </button>)
    }


  return (
    <Grow in>
        <Container maxWidth='xl' className='homeContainer' sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
          <CreateButton Class='secondBut'/>
            <div>
                <Posts posts={posts} isLoading={isLoading} setCurrentId={setCurrentId}/>
            </div>
            <Grid className='formContainer' item xs={12} sm={6} md={3} >
                <Backdrop open={open} sx={{zIndex: '2'}} onClick={user ?  null : toggleOpen}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} handleClick={toggleOpen} />
                </Backdrop>
              {searchQuery ? <></> : 
                <Paper className='pagination' elevation={3} sx={{borderRadius: '40px', display: `${isLoading ? 'none' : 'flex'}` }} >
                  <Paginate page={page} />
                </Paper> 
              }
            </Grid>
            <div style={{display: 'flex', width: '100vw', height: '100vh', alignItems: 'flex-end',padding : '1.5rem', position: 'fixed', top: '0', right: '0',pointerEvents: 'none',userSelect: 'none' ,zIndex: '2'}} >
              {open ? <></> : 
                <CreateButton/>
              }  
            </div>
        </Container>
      </Grow>
  )
}

export default Home