import React from 'react'
import { CssBaseline} from '@mui/material'

import {Home, Auth, PostDetails, User,Chat} from './containers'
import { Navbar } from './components'
import { BrowserRouter, Route,Routes} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => {
  return (
      <BrowserRouter>
          <GoogleOAuthProvider clientId='296166462666-c9lkr2tl8d3ptajlbipovshjtnguvge9.apps.googleusercontent.com'>
              <CssBaseline/>
                  <Navbar/>
                      <Routes>
                        <Route path='/' exact element={<Home/>} />
                        <Route path='/posts' exact element={<Home/>}/>
                        <Route path='/posts/search' exact element={<Home/>}/>
                        <Route path='/post/:id' exact element={<PostDetails/>}/>
                        <Route path='/user/:id' exact element={<User/>} />
                        <Route path='/auth' exact element={<Auth/>}/>
                        <Route path='/chat' exact element={<Chat/>}/>
                      </Routes>
          </GoogleOAuthProvider>
      </BrowserRouter>
  )
}

export default App