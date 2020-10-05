import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';

const SelectItem = ({ name, label, value, error = null, onChange, options }) => {

  return (
    <FormControl
      variant="outlined"
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {
          options.map(
            item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
          )
        }
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default SelectItem
