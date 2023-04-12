import React , {useState, useEffect} from 'react'
import { TextField, Button, Typography, Paper  } from '@mui/material';
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import useStyles from './styles'
import { createPost , updatePost } from '../../action/posts';
import { Close } from '@mui/icons-material';

const Form = ({currentId, setCurrentId, handleClick}) => {

  const [postData, setPostData] = useState({ title: '' , message: '', tags: '', selectedFile: '',
  })

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null )
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(()=> {
    if(post) setPostData(post);
  },[post])

  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId){
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
    } else {
      dispatch(createPost({...postData, name: user?.result?.name},history))
    }
    clear();
    handleClick();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '' , message: '', tags: '', selectedFile: '',
    })
  }

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please signIn to CreatePost and like
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6} >
      <div style={{alignSelf: 'end'}} onClick={handleClick}>
        <Close/>
      </div>
      <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit} >
        <Typography variant='h6' >
          {currentId ? 'Editing' : 'Create'} a Memory
        </Typography>
        <TextField name='title'   variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>
        <TextField name='message'   variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
        <TextField name='tags'   variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}/>
        <div className={classes.fileInput} >
          <FileBase
            type='file'
            multiple={false}
            onDone={({base64})=> {setPostData({ ...postData, selectedFile: base64})}}
          />
        </div>
        <Button sx={{marginBottom: '10px'}} variant='contained' color="primary" size='large' type='submit' fullWidth >Submit</Button>
        <Button variant='contained' color="secondary" size='small' onClick={clear} fullWidth >Clear</Button>
      </form>
    </Paper>
  )
}

export default Form