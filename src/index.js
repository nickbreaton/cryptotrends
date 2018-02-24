import { coins } from './lib/coins'
import { module as app } from './state/app'
import { registerCache } from './lib/cache'
import { render } from 'react-dom'
import { store } from './state'
import * as d3 from 'd3'
import Menu from './components/Menu'
import React from 'react'

const start = new Date()
start.setFullYear(start.getFullYear() - 1)

// Uncomment to refresh data:

const { app: { currentCoin } } = store.getState()
store.dispatch(app.actions.pointsRequest(
  coins.get(currentCoin).name, currentCoin, start
))

const root = d3.select('#root')
  // .style('padding-top', '2rem')
  // .style('display', 'flex')
  // .style('align-items', 'center')
  // .style('justify-content', 'center')

render(<Menu />, root.node())
registerCache()
