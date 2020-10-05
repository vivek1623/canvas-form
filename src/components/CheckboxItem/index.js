import React from 'react'
import { FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

const CheckboxItem = ({ name, label, value, onChange }) => {
  const convertToDefEventPara = (name, value) => ({
    target: {
      name, 
      value
    }
  })

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            color="primary"
            checked={value}
            onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
          />
        }
        label={label}
      />
    </FormControl>
  )
}

export default CheckboxItem
