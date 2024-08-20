import React from 'react'
import { TextField } from '@mui/material'

export const InputForm = ({
  placeholder,
  name,
  register,
  variant='outlined',
}) => {
  return (
    <TextField
      placeholder={placeholder}
      variant={variant}
      autoComplete='off'
      { ...register(name, { required: true }) }
      sx={{ width: '100%' }}
    />
  )
}
