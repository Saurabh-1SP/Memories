import { Backdrop, Button, Container, Grid, Grow, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useLocation } from 'react-router-dom'
import { Add } from '@mui/icons-material'

import { getPosts } from '../../action/posts'
import useStyles from './styles'
import {Form,Paginate,Posts} from '../'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const Home = () => {

    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const page = query.get('page')  || 1;
    const searchQuery = query.get('searchQuery');
    const [open, setOpen] = useState(false)
    const {posts,isLoading} = useSelector((state)=> state.posts)

    console.log(`create post is ${open}`)
    const toggleOpen = () => {
      setOpen(!open)
    }
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId, dispatch])


  return (
    <Grow in>
        <Container maxWidth='xl' sx={{marginTop: '2rem'}} >
            <div style={{zIndex: '1'}}>
                <Posts posts={posts} isLoading={isLoading} setCurrentId={setCurrentId}/>
            </div>
            <Grid className={classes.formContainer} item xs={12} sm={6} md={3} >
                <Backdrop open={open} sx={{zIndex: '2'}}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} handleClick={toggleOpen} />
                </Backdrop>
              {searchQuery ? <></> : 
                <Paper className={classes.pagination} elevation={3} sx={{borderRadius: '40px', display: `${isLoading ? 'none' : 'flex'}` }} >
                  <Paginate page={page} />
                </Paper> 
              }
            </Grid>
            <div style={{display: 'flex', width: '100vw', height: '100vh', alignItems: 'flex-end',padding : '1.5rem', position: 'fixed', top: '0', right: '0',pointerEvents: 'none',userSelect: 'none'}} >
              {open ? <></> : 
                  <Button onClick={toggleOpen} sx={{ backgroundColor: '#35a6f2', borderRadius: '8px', color: 'white', padding: '10px',  margin: '1rem',  width: 'fit-content',  position: 'absolute',  right: '0',  minWidth: '130',  fontSize: 16,  fontWeight: 400,  gap: '10px',  pointerEvents: 'auto',  userSelect: 'auto',  '&:hover': {   backgroundColor: 'white',   color: '#35a6f2',   fontWeight: '600'  }}} >
                    <Add/>
                    Create Post
                  </Button>
              }  
            </div>
        </Container>
      </Grow>
  )
}

export default Home