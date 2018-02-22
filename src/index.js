import { createStore } from 'redux-box'
import { module as app } from './state/app'
import { render } from 'react-dom'
import { persistStore, persistReducer } from 'redux-persist'
import createWorkerMiddleware from 'redux-worker-middleware'
import PointsWorker from './workers/points.worker'
import React from 'react'
import storage from 'redux-persist/lib/storage'

const store = createStore([ app ], {
  middlewares: [
    createWorkerMiddleware(new PointsWorker)
  ],
  decorateReducer: reducer => {
    return persistReducer({ key: 'test', storage }, reducer);
  }
})

persistStore(store)

const Stringify = ({ value = {} }) => (
  <pre>{JSON.stringify(value, null, 2)}</pre>
)

store.subscribe(() => {
  const { app: { points } } = store.getState()
  const App = () => ( <Stringify value={points} /> )
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

