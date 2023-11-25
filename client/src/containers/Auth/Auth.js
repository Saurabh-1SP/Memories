import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Box, CircularProgress} from '@mui/material';
import {Lock } from '@mui/icons-material';
import { GoogleLogin} from '@react-oauth/google'
import { useDispatch, useSelector} from 'react-redux'
import jwt_decode from 'jwt-decode'
import { useNavigate,} from 'react-router-dom';

import './styles.css'
import Input from './Input';
import {googleSignIn, signin, signup} from '../../action/auth'

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: '',confirmPassword: ''});
    let {email, password,isLoading} = useSelector((state) => state.auth);
    const [correct, setCorrect] = useState(true);
    const dispatch = useDispatch();
    const history = useNavigate();

    const switchMode = () => {
        setIsSignUp((prevSignUp)=> !prevSignUp)
        setShowPassword(false)
    };


    const HandleSubmit = (e) => {
        e.preventDefault();

        try {
            if(isSignUp) {
                dispatch(signup(formData,history))
            } else{
                dispatch(signin(formData,history))
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleChange = (e) => {
       setFormData({...formData, [e.target.name]: e.target.value})
    };
    const confirmPasswordChange = (e)=> {
        setFormData({...formData, confirmPassword: e.target.value})
        if(formData.confirmPassword === formData.password) {
            setCorrect(true)
        } else {
            setCorrect(false)
        }

    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const googleSuccess = (res) => {
        const result = jwt_decode(res.credential);
        const token = res?.credential;
        try {
            const data = {result,token}
            dispatch(googleSignIn(data,history))
            // dispatch({type: 'AUTH', data: { result, token}}); 
            
            // history('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error) => {
        console.log(`Something went wrong try again : ${error}`)
    }
    
  return (
        <Container component='main' maxWidth='xs' className='authContainer' sx={{display: 'flex'}} >
            <Paper className='paper' elevation={3} >
                <Avatar className='avatar' sx={{backgroundColor: '#da5583'}} >
                    <Lock/>
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className='form' onSubmit={HandleSubmit} >
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )}
                        <Input name='email' label='Email Address' handleChange={handleChange}/>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={confirmPasswordChange} type='password' />}
                    </Grid>
                    {isSignUp ? 
                        <Typography color='error'>{email ? `` : "User Already Exist" }</Typography>
                        :
                        <Typography color='error' >{email ? `${password ? '' : "Incorrect Password"}` : "User Don't Exist" }</Typography>
                    }
                    {isLoading ? <CircularProgress/> : 
                        <Button disabled={isSignUp ? correct : false} type='submit' fullWidth variant='contained' color='primary' className='submit'>{ isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    }
                    <Box>
                        <Box display='flex' flexDirection='column' alignContent='center' justifyContent='center' gap='0.5rem' >
                        {/* <Button className={classes.googleButton} color='primary' fullWidth onClick={() => login()} startIcon={<Icon/>} variant='contained' >Google SignIn</Button> */}
                            <GoogleLogin 
                            onSuccess={googleSuccess}
                            onError={googleFailure}
                            />
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In': "Don't have a account? Sign Up"}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Container>
  )
}

export default Auth