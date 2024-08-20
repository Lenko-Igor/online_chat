import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Stack, Typography, Container, Button } from '@mui/material';

import './styles.css'
import { InputForm } from '../InputForm'
import { Logo } from '../Logo';

export const JoinPage = () => {
  const navigate = useNavigate()
  const { handleSubmit, register, formState: { isValid } } = useForm()

  const onSubmit = ({ user, room }) => {
    navigate(`/chat?name=${user}&room=${room}`)
  }
  
  return (
    <Stack justifyContent={'center'} className='paper'>
      <Logo />

      <Container maxWidth='sm' className='window'>
          <Typography component={'h1'} className='title'>Join to room for start to chat</Typography>

          <Stack
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            gap={2}
            className='form'
          >
            <Stack direction={'column'} justifyContent={'space-between'} gap={'15px'}>
              <InputForm 
                name={'user'}
                placeholder={'Enter your name'}
                register={register}
              />
              <InputForm 
                name={'room'}
                placeholder={'Enter chatroom'}
                register={register}
              />
            </Stack>
            <Button
              type='submit'
              variant='contained'
              disabled={!isValid}
            >
              Submit
            </Button>
          </Stack>

      </Container>

    </Stack>
  )
}
