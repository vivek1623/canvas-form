import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const AppHeader = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
      <Typography variant="h6">Game Change</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader