import React from 'react'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    }
  }
}))

const Form = ({ children, ...other }) => {
  const classes = useStyles()
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  )
}

export default Form
