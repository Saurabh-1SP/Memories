import React from 'react'
import {Grid, CircularProgress,} from '@mui/material'

import './styles.css'
import Post from './post/Post'

const Posts = ({setCurrentId,posts,isLoading}) => {


  if(!posts.length && !isLoading) return 'No Posts';

  return (
    isLoading? <CircularProgress/> : (
    !posts?.length ? <CircularProgress/> : (
      <Grid className='mainContainer' container alignItems='stretch' spacing={4} >
        {posts.map((post)=>(
          <Grid key={post._id} item xl={2} md={3} xs={12} sm={6} >
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}

      </Grid>
    ))
  )
}

export default Posts