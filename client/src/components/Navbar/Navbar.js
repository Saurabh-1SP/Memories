import { AppBar, Avatar, Box, Button, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { memoriesLogo, memoriesText } from '../../assets'
import decode from 'jwt-decode'


import './style.css'
import SearchBar from '../SearchBar/SearchBar'
import { Logout } from '@mui/icons-material'


const Navbar = () => {
    
    const dispatch = useDispatch();
    const history = useNavigate();
    const loactaion = useLocation();

    const [user, setUser] = useState(null)

    const logout = useCallback(() => {
        dispatch({type: 'LOGOUT'})
        
        setUser(null);
        history('/')

    },[dispatch,history,setUser])

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[loactaion, logout, user?.token,history])

  return (
    <AppBar className='appBar' sx={{flexDirection: 'row'}} position='static' color='inherit' >
        <Link to='/' className="brandContainer" >
            <img src={memoriesLogo} alt='icon' height='45px'  />
            <img className="image" src={memoriesText}  alt='memerories' height='40px' />
        </Link>
        <Box className="container" >
            <SearchBar/>
            <Box className="toolbar">
                {user ? (
                <div className='profile'>
                    <div className="brandContainer" >
                        <Avatar className='image' alt={user.result.name} src={user.result.picture}>{user.result.name?.charAt(0)}</Avatar>
                        <Typography className='userName' variant='h6'>{user.result.name}</Typography>
                    </div>
                    <Button variant='contained' className='logout' onClick={logout} color='secondary'>Log Out </Button>
                    <Logout className='logout-icon' onClick={logout} />
                </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Box>
        </Box>
      </AppBar>
  )
}

export default Navbar