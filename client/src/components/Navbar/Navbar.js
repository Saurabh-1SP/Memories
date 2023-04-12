import { AppBar, Avatar, Box, Button, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { memoriesLogo, memoriesText } from '../../assets'
import decode from 'jwt-decode'


import useStyles from './style'
import SearchBar from '../SearchBar/SearchBar'


const Navbar = () => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const loactaion = useLocation();

    const [user, setUser] = useState(null)

    const logout = useCallback(() => {
        dispatch({type: 'LOGOUT'})
        
        setUser(null);
        history.push('/')

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
    <AppBar className={classes.appBar} sx={{flexDirection: 'row'}} position='static' color='inherit' >
        <Link to='/' className={classes.brandContainer} >
            <img src={memoriesLogo} alt='icon' height='45px'  />
            <img className={classes.image} src={memoriesText}  alt='memerories' height='40px' />
        </Link>
        <Box display='flex' gap='1rem' justifyContent='center' alignContent='center' >
            <SearchBar/>
            <Box className={classes.toolbar}>
                {user ? (
                <div className={classes.profile}>
                        <div className={classes.brandContainer} gap='1rem'>
                            <Avatar className={classes.image} alt={user.result.name} src={user.result.picture}>{user.result.name?.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        </div>
                        <Button variant='contained' className={classes.logout} onClick={logout} color='secondary'>Log Out</Button>
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