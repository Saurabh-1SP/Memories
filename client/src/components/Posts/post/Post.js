import React, { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Box, Avatar, TextField, Divider } from '@mui/material';
import {ThumbUpAltOutlined, ThumbUpAlt, MoreVert, CommentOutlined,  PostAddSharp} from '@mui/icons-material';
// import DeleteIcon from '@mui/material/Icon';
// import MoreHorizIcon from '@mui/material/Icon';
import moment from 'moment'
import {useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { createComment, getPostsByTags, likePost } from '../../../action/posts';
import './styles.css'

const Post = ({post,setCurrentId}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [commentView, setCommentView] = useState(false)
    const [comment, setComment] = useState({comment: '',user: user?.result?._id,likes: []})

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

    const handlClick = (e) => {
      e.preventDefault();

      dispatch(createComment(comment,post._id))
    }

    const openPost = () => {
      dispatch(getPostsByTags({tags: 
        post?.tags}))
      history(`/post/${post._id}`)
    }
    const openUser = () => {
      history(`/user/${post.name}`)
    }

  return (
    <Card className='card' raised elevation={8} sx={{borderRadius: '15px'}} >
        <div className='overlay'>
          <Typography onClick={openUser} variant='h6' >{post.name}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
      <ButtonBase className='cardAction' onClick={openPost} sx={{display: 'block'}} >
        <CardMedia className='media' image={post.selectedFile}  title={post.title}/>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
        <div className="overlay2" >
          <Button style={{color: 'white', justifyContent: 'right'}} size='small' onClick={()=> setCurrentId(post._id)} >
            <MoreVert fontSize='small'/>
          </Button>
        </div>
        )}
        {/* <div className={classes.details} >
          <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=> `#${tag} ` )}</Typography>
        </div> */}
        <Typography className='title' variant='h5' >{post.title}</Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p' >{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className='cardActions' sx={{padding: '0px 16px 8px 16px'}} >
        <Button size='small' color='primary' disabled={!user?.result} onClick={()=> dispatch(likePost(post._id))}>
          <Likes/>
        </Button>
        <Button size='small' style={{justifyContent: 'right'}} color='primary' disabled={!user?.result} onClick={()=> setCommentView(true)}>
         <Typography> {post.comments.length>0 ? `${post.comments.length}` : ''} </Typography>&nbsp; <CommentOutlined fontSize='small'/> 
        </Button>
        {/* {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button size='small' color='primary'  onClick={()=> dispatch(deletePost(post._id))}>
          <DeleteOutline fontSize='small'/>
          Delete
          </Button>
        )} */}
      </CardActions>
        <Box sx={{width: '100%',height: '56%', backgroundColor: '#f3f3f3', position: 'absolute',top: commentView ? '45%' : '100%', left: '0rem', transition: '0.5s',}} >
          <div className='postCommentContainer'>
            <Avatar className='post_avatar' alt={user?.result?.name} src={user?.result?.picture}>{user?.result?.name.charAt(0)}</Avatar>
            <TextField name='comment' value={comment.comment} onChange={(e) => setComment({...comment,comment: e.target.value})} placeholder='comment' inputProps={{style: {padding: '6px'}}} />
            <div onClick={handlClick}>
              <PostAddSharp fontSize='medium' className='commentBtn'/>
            </div>
          </div>
          <Divider/>
          {/* <div className='commentsContainter' > */}
            {post?.comments.length ? (
              <div className='commentsContainer'>
                {post?.comments.map((comment) => (
                  <>
                    <div className='comment'>
                      <Avatar sizes='small' className='post_avatar' alt={comment.user.userName} >{user?.result?.name.charAt(0)}</Avatar>
                      <div className='commentContent'>
                        <div className='commentContentHeader'>
                          <Typography variant='h6' fontSize='14px' fontWeight='500' >{comment.user.userName}</Typography>
                          <Typography variant='body2' fontSize='10px' fontWeight='400'>{moment(comment.createdAt).fromNow()}</Typography>
                        </div>
                        <Typography>{comment.comment}</Typography>
                      </div>
                    </div>
                    <Divider sx={{width: '80%', alignSelf: 'center'}}/>
                  </>
                ))}
              </div>
            ): <Typography variant='h5' sx={{textAlign: 'center'}}>Be the first One to Comment</Typography>}
          {/* </div> */}
        </Box>
    </Card>
  )
}

export default Post