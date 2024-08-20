import React from 'react'
import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";

import './styles.css'
import { Logo } from '../Logo';

export const Menu = ({ users, clickBtn }) => {
  return (
    <Stack
      justifyContent={'space-between'}
      className='menu'
    >
      <Box className='list'>

        <Logo />

        <Typography className="sub-title">{`${users.length} users in this room`}</Typography>

        <List>
          {!!users.length && users.map((user, i) => (
            <ListItem key={i} className='item'>{user.name}</ListItem>
          ))}
        </List>

      </Box>

      <Stack alignItems={'center'} justifyContent={'center'} className='footer'>
        <Button className='btn' variant="contained" color="error" onClick={clickBtn}>
          Leave the room
        </Button>
      </Stack>
    </Stack>
  )
}
