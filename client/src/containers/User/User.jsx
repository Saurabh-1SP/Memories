import React,{useEffect} from 'react'

import './style.css'
import { fetchUser } from '../../action/user'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {

  const dispatch = useDispatch();
  const {name}  = useParams();

  useEffect(() => {
    dispatch(fetchUser(name));
  },[dispatch,name])

  const user = useSelector((state) => state.user);

  console.log(user.user)
  return (
    <div></div>
  )
}

export default User