/* eslint-disable no-useless-escape */
export const log = (...arg) => {
  if (process.env.NODE_ENV !== 'production')
    console.log(...arg)
}

export const isEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

export const getDataFromLocalStorage = (key, undefined_return_value) => {
  const data = localStorage.getItem(key)
  return (data && data !== undefined ? JSON.parse(data) : undefined_return_value)
}

export const setDataInLocalStorage = (key, data) => {
  const json_data = JSON.stringify(data)
  localStorage.setItem(key, json_data)
}

export const checkDevice = {
  screen_orientation: function () {
    if (window.matchMedia("(orientation:landscape)").matches) {
      return 'landscape'
    } else {
      return 'portrait'
    }
  },
  screen_type: function () {
    if (window.innerWidth <= 480) {
      return 'xs'
    } else if (window.innerWidth <= 768) {
      return 'sm'
    } else if (window.innerWidth <= 992) {
      return 'md'
    } else if (window.innerWidth <= 1200) {
      return 'lg'
    } else if (window.innerWidth <= 1600) {
      return 'hd'
    } else if (window.innerWidth <= 2560) {
      return 'fhd'
    } else {
      return 'uhd'
    }
  },
  deviceStatus: function () {
    return (
      {
        screen_width: window.innerWidth,
        screen_height: window.innerHeight,
        screen_orientation: this.screen_orientation(),
        screen_type: this.screen_type()
      }
    )
  }
}