import React, { useEffect } from 'react'
import { Pagination, PaginationItem } from '@mui/material'

import { Link } from 'react-router-dom';
import { getPosts } from '../../action/posts.js';
import { useDispatch, useSelector } from 'react-redux';

const Paginate = ({page}) => {

  const {numberOfPages} = useSelector((state) => state.posts)
  const dispatch = useDispatch();

  useEffect(() => {
    if(page) dispatch(getPosts(page));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  

  return (
    <Pagination
      count={numberOfPages}
      page={Number(page) || 1 }
      variant='outlined'
      color='primary'
      sx={{display: 'flex', justifyContent: 'center'}}
      renderItem={(item)=> (
        <PaginationItem 
          {...item} component={Link} to={`/posts?page=${item.page}`}
        />
      )}
      />
  )
}

export default Paginate