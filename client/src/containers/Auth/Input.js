import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import {VisibilityOff,Visibility} from '@mui/icons-material'

const Input = ({ name, handleChange, label, type, handleShowPassword,autoFocus, half}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant='outlined'
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={ name === 'password' ? {
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            } : null }
        />
    </Grid>
  )
}

export default Input