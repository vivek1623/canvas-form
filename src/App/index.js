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
    paddingBottom: theme.spacing(2),
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

  useEffect(() => {
    let flag = false;
    let prevX = 0;
    let currX = 0;
    let prevY = 0;
    let currY = 0;
    let dot_flag = false;
    let w = contentRef.current.clientWidth;
    let h = contentRef.current.clientHeight;
    let ctx = false;
    let canvas = false;

    if (startPainting) {
      canvas = document.getElementById('formCanvas');
      ctx = canvas.getContext("2d");
      canvas.width = w
      canvas.height = h
    } else if (canvas) {
      ctx.clearRect(0, 0, w, h);
    }

    const findMousePosition = (res, e) => {
      const rect = canvas.getBoundingClientRect()
      if (res === 'down') {
        prevX = currX;
        prevY = currY;
        currX = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        currY = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        flag = true;
        dot_flag = true;
        if (dot_flag) {
          ctx.beginPath();
          ctx.fillStyle = COLORS.SECONDARY;
          ctx.fillRect(currX, currY, 2, 2);
          ctx.closePath();
          dot_flag = false;
        }
      }
      if (res === 'up' || res === "out") {
        flag = false;
      }
      if (res === 'move') {
        if (flag) {
          prevX = currX;
          prevY = currY;
          currX = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
          currY = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
          draw();
        }
      }
    }

    const draw = () => {
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.strokeStyle = COLORS.SECONDARY;
      ctx.lineWidth = BRUSH_SIZE;
      ctx.stroke();
      ctx.closePath();
    }

    if (canvas) {
      canvas.addEventListener("mousemove", e => findMousePosition('move', e), false);
      canvas.addEventListener("mousedown", e => findMousePosition('down', e), false);
      canvas.addEventListener("mouseup", e => findMousePosition('up', e), false);
      canvas.addEventListener("mouseout", e => findMousePosition('out', e), false);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousemove", e => findMousePosition('move', e), false);
        canvas.removeEventListener("mousedown", e => findMousePosition('down', e), false);
        canvas.removeEventListener("mouseup", e => findMousePosition('up', e), false);
        canvas.removeEventListener("mouseout", e => findMousePosition('out', e), false);
      }
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className={classes.appContainer} elevation={0} square>
        <AppHeader />
        {
          startPainting &&
          <canvas
            id="formCanvas"
            className={classes.formCanvas}
            style={{ cursor: `url(${editIcon}), default` }}
          ></canvas>
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
      </Paper>
    </ThemeProvider>
  );
}

export default App;
