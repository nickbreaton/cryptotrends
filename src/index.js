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
//   'Bitcoin', 'BTC', start
// ))

// -------- Visualization Code -------
import * as d3 from 'd3'

function render(points) {
  const svg = d3.select('#root').append('svg')

  svg
    .attr('width', 750)
    .attr('height', 400)

  // parse dates
  points = points.map(point => Object.assign({}, point, {
    date: new Date(point.date)
  }))

  const width = +svg.attr('width')
  const height = +svg.attr('height')

  const x = d3.scaleTime().range([0, width])
  const y0 = d3.scaleLinear().range([height, 0])
  const y1 = d3.scaleLinear().range([height, 0])

  const priceLine = d3.line()
    .x(d => x(d.date))
    .y(d => y0(d.price))

  const interestLine = d3.line()
    .x(d => x(d.date))
    .y(d => y1(d.interest))

  x.domain(d3.extent(points, d => d.date))
  y0.domain([ 0, d3.max(points, d => d.price) ])
  y1.domain([ 0, d3.max(points, d => d.interest) ])

  svg.append('path')
    .data([ points ])
    .attr('d', priceLine)
    .attr('stroke', 'blue')
    .attr('fill', 'transparent')

  svg.append('path')
    .data([ points ])
    .attr('d', interestLine)
    .attr('stroke', 'red')
    .attr('fill', 'transparent')
}
