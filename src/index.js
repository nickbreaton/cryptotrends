import { createStore } from 'redux-box'
import { module as app } from './state/app'
import { persistStore, persistReducer } from 'redux-persist'
import { registerCache } from './lib/cache'
import createWorkerMiddleware from 'redux-worker-middleware'
import PointsWorker from './workers/points.worker'
import storage from 'redux-persist/lib/storage'

const store = createStore([ app ], {
  middlewares: [
    createWorkerMiddleware(new PointsWorker)
  ],
  decorateReducer: reducer => {
    return persistReducer({
      key: 'test',
      storage
    }, reducer);
  }
})

persistStore(store)

registerCache()

store.subscribe(() => {
  const { app: { points, isLoading } } = store.getState()
  if (!isLoading) {
    render(points)
  }
})

const start = new Date()
start.setFullYear(start.getFullYear() - 1)

// Uncomment to refresh data:

// store.dispatch(app.actions.pointsRequest(
//   'Ethereum', 'ETH', start
// ))

// -------- Visualization Code -------
import * as d3 from 'd3'
import { complement } from 'polished'
import debounce from 'lodash.debounce'

const root = d3.select('#root')
  .style('padding-top', '2rem')
  .style('display', 'flex')
  .style('align-items', 'center')
  .style('justify-content', 'center')

const svg = root.append('svg')

window.addEventListener('resize', () => {
  window.requestAnimationFrame(() => {
    svg.node().innerHTML = ''
    const { app: { points, isLoading } } = store.getState()
    render(points)
  })
})

function render(points) {
  svg
    .attr('width', 900)
    .attr('height', 400)
    // .style('background', 'white')
    // .style('border', '1px solid #ccc')
    // .style('border-radius', '5px')

  const padding = 45
  const width = svg.node().getBoundingClientRect().width - padding
  const height = svg.node().getBoundingClientRect().height - padding

  const x = d3.scaleTime().range([padding, width])
  const y0 = d3.scaleLinear().range([height, padding])
  const y1 = d3.scaleLinear().range([height, padding])

  const priceLine = d3.line()
    .x(d => x(d.date))
    .y(d => y0(d.price))

  const priceArea = d3.area()
    .x(d => x(d.date))
    .y0(y0(0))
    .y1(d => y0(d.price))

  const interestLine = d3.line()
    .x(d => x(d.date))
    .y(d => y1(d.interest))

  const interestArea = d3.area()
    .x(d => x(d.date))
    .y0(y1(0))
    .y1(d => y1(d.interest))

  // parse dates
  points = points
    .map(point => Object.assign({}, point, {
      date: new Date(point.date)
    }))

  x.domain(d3.extent(points, d => d.date))
  y0.domain([ d3.min(points, d => d.price), d3.max(points, d => d.price) ])
  y1.domain([ d3.min(points, d => d.interest), d3.max(points, d => d.interest) ])

  interest()
  price()

  function price() {
    svg.append('path')
      .data([ points ])
      .attr('d', priceArea)
      .attr('class', 'line__area line__area--price')

    svg.append('path')
      .data([ points ])
      .attr('d', priceLine)
      .attr('class', 'line line--price')
  }

  function interest() {
    svg.append('path')
      .data([ points ])
      .attr('d', interestArea)
      .attr('class', 'line__area line__area--interest')

    svg.append('path')
      .data([ points ])
      .attr('d', interestLine)
      .attr('class', 'line line--interest')
  }
}
