import React, { useEffect, useState, useRef } from 'react';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness5Icon from '@material-ui/icons/Brightness5'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'


import { getDataFromLocalStorage, setDataInLocalStorage } from '../data/config/utils'
import { LOCAL_STORAGE, COLORS, BRUSH_SIZE } from '../data/config/constants'
import { editIcon } from '../data/assets'

import light from '../data/theme/light'
import dark from '../data/theme/dark'

import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import InsuranceForm from './InsuranceForm'

const useStyles = makeStyles(theme => ({
  appContainer: {
    width: '100%',
    paddingTop: theme.spacing(8),
    position: 'relative'
  },
  contentContainer: {
    overflowY: "auto",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(8)
  },
  editIcon: {
    position: 'fixed',
    top: 75,
    right: 15,
    color: theme.palette.common.white,
    zIndex: 20
  },
  themeIcon: {
    position: 'fixed',
    top: 125,
    right: 15,
    color: theme.palette.common.white,
    zIndex: 20
  },
  formCanvas: {
    position: 'absolute',
    top: 64,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  }
}))

const isDarkTheme = getDataFromLocalStorage(LOCAL_STORAGE.IS_DARK_THEME, false)

const App = () => {
  const [darkTheme, setDarkTheme] = useState(isDarkTheme)
  const [startPainting, setStartPainting] = useState(false)
  const classes = useStyles()
  const theme = createMuiTheme(darkTheme ? dark : light)

  const contentRef = useRef(null)
  const canvasRef = useRef(false)
  const isPainting = useRef(false)
  const prevPos = useRef({ offsetX: 0, offsetY: 0 })
  const ctx = useRef(false)

  useEffect(() => {
    const w = contentRef.current.clientWidth
    const h = contentRef.current.clientHeight

    if (startPainting) {
      ctx.current = canvasRef.current.getContext("2d")
      canvasRef.current.width = w
      canvasRef.current.height = h
    } else if (ctx.current) {
      ctx.current.clearRect(0, 0, w, h);
    }
  }, [startPainting])

  const handleThemeChange = () => {
    const isDarkThemeSelected = !darkTheme
    setDataInLocalStorage(LOCAL_STORAGE.IS_DARK_THEME, isDarkThemeSelected)
    setDarkTheme(isDarkThemeSelected)
  }

  const handlePaintingChange = () => {
    setStartPainting(startPainting => !startPainting)
  }

  const onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    isPainting.current = true;
    prevPos.current = { offsetX, offsetY };
  }

  const onMouseMove = ({ nativeEvent }) => {
    if (isPainting.current) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      draw(offSetData);
    }
  }

  const endPaintEvent = () => {
    if (isPainting.current)
      isPainting.current = false
  }

  const draw = currPos => {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos.current;
    ctx.current.beginPath();
    ctx.current.moveTo(x, y);
    ctx.current.lineTo(offsetX, offsetY);
    ctx.current.strokeStyle = COLORS.PRIMARY;
    ctx.current.lineWidth = BRUSH_SIZE;
    ctx.current.lineJoin = 'round';
    ctx.current.lineCap = 'round';
    ctx.current.stroke();
    ctx.current.closePath()
    prevPos.current = { offsetX, offsetY };
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className={classes.appContainer} elevation={0} square>
        <AppHeader />
        {
          startPainting &&
          <canvas
            ref={canvasRef}
            id="formCanvas"
            className={classes.formCanvas}
            style={{ cursor: `url(${editIcon}), default` }}
            onMouseDown={onMouseDown}
            onMouseLeave={endPaintEvent}
            onMouseUp={endPaintEvent}
            onMouseMove={onMouseMove}
          />
        }
        <div ref={contentRef} className={classes.contentContainer}>
          <Fab
            color={startPainting ? "primary" : "secondary"}
            aria-label="edit"
            size="small"
            className={classes.editIcon}
            onClick={handlePaintingChange}
          >
            {
              startPainting ? <CloseIcon /> : <EditIcon />
            }
          </Fab>
          <Fab
            color="secondary"
            aria-label="theme"
            size="small"
            className={classes.themeIcon}
            onClick={handleThemeChange}
          >
            {
              darkTheme ? <Brightness5Icon /> : <Brightness4Icon />
            }
          </Fab>
          <Grid container direction='row' justify='center'>
            <Grid item xs={12} sm={10}>
              <InsuranceForm />
            </Grid>
          </Grid>
        </div>
        <AppFooter />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
