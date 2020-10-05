import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  appFooter: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    fontWeight: 600
  }
}))

const AppFooter = memo(() => {
  const classes = useStyles()
  return (
    <Typography
      className={classes.appFooter}
      variant="span"
      align= 'center'
    >
      Created By - VIVEK VAIBHAV
    </Typography>
  )
})

export default AppFooter
