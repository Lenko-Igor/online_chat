import React from 'react'
import { Stack, Typography } from '@mui/material'

import './styles.css'

export const Messages = ({ user, isCurrentUser }) => {
  const { name, message } = user || {}

  return (
    <Stack direction={'column'} alignItems={isCurrentUser ? 'flex-end' : ''} className='message'>
      <Typography component={'h3'} className='title'>{name}</Typography>
      <Typography className={`msg ${isCurrentUser ? 'green' : 'grey'}`}>{message}</Typography>
    </Stack>
  )
}
