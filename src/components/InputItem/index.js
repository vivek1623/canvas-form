import React from 'react'
import { TextField } from '@material-ui/core';

const InputItem = ({ name, label, value, error = null, onChange, ...other }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
}

export default InputItem
