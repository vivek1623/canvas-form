import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import { logoIcon } from "../../data/assets"

const AppHeader = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          component="img"
          src={logoIcon}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography variant="h6" style={{ fontWeight: 600 }}>
          Canvas Form
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
