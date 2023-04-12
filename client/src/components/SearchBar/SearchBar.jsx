import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import './style.css'
import {getPostsBySearch} from '../../action/posts'

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const toggle = () => setIsSearch(!isSearch);

  const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        searchPost();
      }
    }

    const searchPost = () => {
      if(search.trim()) {
        dispatch(getPostsBySearch(search))
        history(`/posts/search?searchQuery=${search || 'none'}`)
      } else {
        history('/')
      }
    }
  return (
    <div className='barContainer' >
      <input 
        type='text'
        onFocus={toggle} 
        onBlur={toggle} 
        placeholder='Search Memories'
        onKeyPress={handleKeyPress} 
        onChange={(e)=> {setSearch(e.target.value); console.log(search)}} 
        className='bar'
      />
    </div>
  )
}

export default SearchBar