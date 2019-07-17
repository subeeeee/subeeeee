import React from 'react'
import ReactDom from 'react-dom'
import './config/globalDef'
import Routes from './common/Routes'
import './sass/base.scss'
import './sass/common/index.scss'
import './sass/typo.css'
import FastClick from 'react-fastclick-alt'

document.getElementById('app-load').remove()

//控制log开关
const ISDEBU = true
ISDEBU ||
  (() => {
    window.console = {
      info: () => {},
      log: () => {},
      warn: () => {},
      debug: () => {},
      error: () => {}
    }
  })()

ReactDom.render(
  <FastClick>
    <Routes />
  </FastClick>,
  document.getElementById('app')
)
