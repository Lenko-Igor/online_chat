import React from 'react'
import { Stack, Typography } from "@mui/material";

import './styles.css'
import logo from '../../assets/images/logo.svg'

export const Logo = () => {
  return (
    <Stack
      className='logo_field'
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'15px'}
    >
      <img src={logo} alt='logo' width={'50px'} />
      <Typography component={'h1'} className="title">Your Chat</Typography>
    </Stack>
  )
}
