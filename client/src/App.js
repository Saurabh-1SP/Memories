import React from 'react'
import { CssBaseline} from '@mui/material'

import {Navbar, Home, Auth, PostDetails, User} from './components'
import { BrowserRouter, Redirect, Route ,Switch} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
      <BrowserRouter>
          <GoogleOAuthProvider clientId='296166462666-c9lkr2tl8d3ptajlbipovshjtnguvge9.apps.googleusercontent.com'>
              <CssBaseline/>
                  <Navbar/>
                      <Switch>
                        <Route path='/' exact component={() => <Redirect to='/posts'/>} />
                        <Route path='/posts' exact component={Home}/>
                        <Route path='/posts/search' exact component={Home}/>
                        <Route path='/post/:id' exact component={PostDetails}/>
                        <Route path='/user/:name' exact component={User} />
                        <Route path='/auth' exact component={() => (!user ? <Auth/> : <Redirect to='/posts'/> )} />
                      </Switch>
          </GoogleOAuthProvider>
      </BrowserRouter>
  )
}

export default App