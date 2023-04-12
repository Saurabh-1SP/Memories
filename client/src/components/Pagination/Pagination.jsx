import React, { useEffect } from 'react'
import { Pagination, PaginationItem } from '@mui/material'

import useStyles from './styles.js'
import { Link } from 'react-router-dom';
import { getPosts } from '../../action/posts.js';
import { useDispatch, useSelector } from 'react-redux';

const Paginate = ({page}) => {

  const {numberOfPages} = useSelector((state) => state.posts)
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if(page) dispatch(getPosts(page));
  }, [page])
  

  return (
    <Pagination
      className={classes.ul}
      count={numberOfPages}
      page={Number(page) || 1 }
      variant='outlined'
      color='primary'
      renderItem={(item)=> (
        <PaginationItem 
          {...item} component={Link} to={`/posts?page=${item.page}`}
        />
      )}
      />
  )
}

export default Paginate