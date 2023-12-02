import React,{useEffect} from 'react'

import './style.css'
import { fetchUser } from '../../action/user'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CircularProgress, Paper } from '@mui/material'

const User = () => {

  const dispatch = useDispatch();
  const {id}  = useParams();

  useEffect(() => {
    dispatch(fetchUser(id));
  },[dispatch,id])

  const {user,isLoading} = useSelector((state) => state.user);

    console.log(user,isLoading)
  if(isLoading) {
    return (
      <Paper elevation={6} className="loadingPaper">
        <CircularProgress size='7em'/>Loading
      </Paper>
    )
  }
  return (
    <div>
      <h1>{user ? user.userName : 'User Not Found'}</h1>
    </div>
  )
}

export default User