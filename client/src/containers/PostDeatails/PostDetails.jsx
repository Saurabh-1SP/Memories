import React,{useEffect} from 'react'
import {CircularProgress, Divider, Paper, Typography} from '@mui/material'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'

import {getPost} from '../../action/posts'
import './styles.css'
import { Chat } from '@mui/icons-material'
import CommentCard from '../../components/CommentCard/CommentCard'

const PostDetails = () => {
    
  const {post,posts, isLoading} = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useNavigate();
  const  {id}  = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  const openPost = (id) => {
    history(`/post/${id}`)
  }

  const recommendedPosts = posts.filter(({_id}) => _id !== id);

  if(!post) return null;

  if(isLoading) {
    return (
      <Paper elevation={6} className="loadingPaper">
        <CircularProgress size='7em'/>Loading
      </Paper>
    )
  }
  return (
    <div className='card'>
      <div className='detailsContainer'>
        <div className="section">
          <Typography variant="h3">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1" component={Link} sx={{textDecoration: 'none',color: 'GrayText'}} to='/chat' ><strong><Chat/> Realtime Chat</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          {/* <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} /> */}
        </div>
        <div className='imageSection'>
          <img className='img' src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
        {recommendedPosts.length > 0 && (
          <div className='section'>
            <Typography gutterBottom variant='h5'>You might also like: </Typography>
            <Divider/>
            <div className='recommendedPosts' >
              {recommendedPosts?.map(({title,message, name , likes, selectedFile, _id})=> (
                <div style={{margin: '20px',cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id} >
                  <Typography gutterBottom variant='h6'>{title}</Typography>
                  <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                  <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                  <Typography gutterBottom variant='subtitle1'>Likes: {likes.length}</Typography>
                  <img src={selectedFile} alt={title} width='200px' />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="commentSection">
          <div className='comment_head app_flex'>
            <Typography variant='h2' fontSize='26px' fontFamily='monospace' fontWeight='600' >{post.comments.length}</Typography>
            <Typography variant='h2' fontSize='26px' fontFamily='monospace' fontWeight='600' style={{marginLeft: '10px'}}>{post.comments.length > 1 ? 'Comments' : 'Comment'}</Typography>
          </div>
          <Divider sx={{width: '100%', alignSelf: 'center'}}/>
          {post.comments.length > 0 && (
            <div className="commentsBox">
              {post.comments.map((comment) => (
                <CommentCard comment = {comment}/>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default PostDetails