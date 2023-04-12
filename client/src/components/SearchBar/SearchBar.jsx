import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

import useStyles from './style.js'
import {getPostsBySearch} from '../../action/posts'

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const classes = useStyles();

  const toggle = () => setIsSearch(!isSearch);

  const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        searchPost();
      }
    }

    const searchPost = () => {
      if(search.trim()) {
        dispatch(getPostsBySearch(search))
        history.push(`/posts/search?searchQuery=${search || 'none'}`)
      } else {
        history.push('/')
      }
    }
  return (
    <div className={classes.barContainer} >
      <input 
        type='text'
        onFocus={toggle} 
        onBlur={toggle} 
        placeholder='Search Memories'
        onKeyPress={handleKeyPress} 
        onChange={(e)=> {setSearch(e.target.value); console.log(search)}} 
        className={classes.bar} 
      />
    </div>
  )
}

export default SearchBar