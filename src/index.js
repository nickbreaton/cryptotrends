import { createStore } from 'redux-box'
import { module as app } from './state/app'
import { persistStore, persistReducer } from 'redux-persist'
import { render } from 'react-dom'
import Stringify from './components/Stringify'
import createWorkerMiddleware from 'redux-worker-middleware'
import PointsWorker from './workers/points.worker'
import React, { Fragment } from 'react'
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

store.subscribe(() => {
  const { app: { points, isLoading } } = store.getState()
  console.log(isLoading)
  const App = () => (
    <Fragment>
      {(isLoading && !!points.length) && (
        <span>refreshing...</span>
      )}
      {(isLoading && !points.length) ? (
        <span>loading...</span>
      ): (
        <Stringify value={points} />
      )}
    </Fragment>
  )
  render(<App />, document.querySelector('#root'))
})

const start = new Date()
start.setDate(start.getDate() - 5)
start.setUTCFullYear(start.getUTCFullYear() - 5)

store.dispatch(app.actions.pointsRequest(
  'Bitcoin', 'BTC', start
))

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
  })
}

