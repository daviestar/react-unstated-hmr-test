import React from 'react'
import {hot} from 'react-hot-loader'
import {Provider} from 'unstated'
import Page from './Page'

const App = () => (
  <Provider>
    <Page />
  </Provider>
)

export default hot(module)(App)
