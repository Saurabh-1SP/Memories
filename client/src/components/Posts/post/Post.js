import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material';
import {ThumbUpAltOutlined, DeleteOutline, ThumbUpAlt, MoreVert} from '@mui/icons-material';
// import DeleteIcon from '@mui/material/Icon';
// import MoreHorizIcon from '@mui/material/Icon';
import moment from 'moment'
import {useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { deletePost, getPostsByTags, likePost } from '../../../action/posts';

import useStyles from './styles'
const Post = ({post,setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
      if(post.likes.length > 0 ) {
        return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id))
        ? (
          <><ThumbUpAlt fontSize='small'/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length -1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ): (
          <> <ThumbUpAltOutlined fontSize='small'/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'} </>
        )
      }
      return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>
    }

    const openPost = () => {
      dispatch(getPostsByTags({tags: 
        post?.tags}))
      history.push(`/post/${post._id}`)
    }
    const openUser = () => {
      history.push(`/user/${post.name}`)
    }

  return (
    <Card className={classes.card} raised elevation={8} sx={{borderRadius: '15px'}} >
        <div className={classes.overlay}>
          <Typography onClick={openUser} variant='h6' >{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
      <ButtonBase className={classes.cardAction} onClick={openPost} sx={{display: 'block'}} >
        <CardMedia className={classes.media} image={post.selectedFile}  title={post.title}/>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} >
          <Button style={{color: 'white'}} size='small' onClick={()=> setCurrentId(post._id)} >
            <MoreVert fontSize='small'/>
          </Button>
        </div>
        )}
        {/* <div className={classes.details} >
          <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=> `#${tag} ` )}</Typography>
        </div> */}
        <Typography className={classes.title} variant='h5' >{post.title}</Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p' >{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions} sx={{padding: '0px 16px 8px 16px'}} >
        <Button size='small' color='primary' disabled={!user?.result} onClick={()=> dispatch(likePost(post._id))}>
          <Likes/>
        </Button>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
        <Button size='small' color='primary'  onClick={()=> dispatch(deletePost(post._id))}>
          <DeleteOutline fontSize='small'/>
          Delete
        </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post