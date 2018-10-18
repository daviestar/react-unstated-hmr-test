import React from 'react'
import {render} from 'react-dom'
import HMR from 'unstated-hmr'
import App from './App'

HMR.isEnabled = true

render(<App />, document.getElementById('root'))
