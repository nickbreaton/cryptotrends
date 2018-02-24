import { coins } from './lib/coins'
import { module as app } from './state/app'
import { Provider } from 'react-redux'
import { registerCache } from './lib/cache'
import { render } from 'react-dom'
import { store } from './state'
import * as d3 from 'd3'
import Menu from './components/Menu'
import Graph from './components/Graph'
import React from 'react'

render((
  <Provider store={store}>
    <React.Fragment>
      <Menu />
      <main>
        <Graph />
      </main>
    </React.Fragment>
  </Provider>
), document.getElementById('root'))
registerCache()
