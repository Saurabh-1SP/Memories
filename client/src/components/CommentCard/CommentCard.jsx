import React from 'react'
import { Avatar, Divider, Typography } from '@mui/material'
import moment from 'moment'

import "./style.css"
import { MoreVert } from '@mui/icons-material'

const CommentCard = ({comment}) => {
  return (
    <div style={{display: 'flex',flexDirection: 'column'}}>
      <div className='comments app_flex'>
          <div className='comment_logo'>
            <Avatar>{comment?.user.userName.charAt(0)}</Avatar>
          </div>      
          <div className='app_flex comment_content'>
            <div className=''>
              <div className='app_flex'>
                <Typography variant='h6' fontSize='14px' fontWeight='550' >{comment?.user.userName}</Typography>
                <Typography variant='body2' fontSize='13px' fontWeight='400'>{moment(comment.createdAt).fromNow()}</Typography>
              </div>
              <Typography variant='body' fontSize='16px'>{comment.comment}</Typography>
            </div>
            <div style={{padding: '5px'}}>
              <MoreVert fontSize='small'/>
            </div>
          </div>
      </div>
      <Divider sx={{width: '95%', alignSelf: 'center'}}/>
    </div>
  )
}

export default CommentCard