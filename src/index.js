import { createStore } from 'redux-box'
import { module as app } from './state/app'
import { render } from 'react-dom'
import createWorkerMiddleware from 'redux-worker-middleware'
import PointsWorker from './workers/points.worker'
import React from 'react'

const store = createStore([ app ], {
  middlewares: [
    createWorkerMiddleware(new PointsWorker)
  ]
})

store.subscribe(() => {
  const App = () => (
    <pre>
      {JSON.stringify(store.getState(), null, 2)}
    </pre>
  )
  render(<App />, document.querySelector('#root'))
})

const start = new Date()
start.setUTCFullYear(start.getUTCFullYear() - 1)

store.dispatch(app.actions.pointsRequest(
  'Bitcoin', 'BTC', start
))

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('dist/sw.js')
  })
}

