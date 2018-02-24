import { createStore } from 'redux-box'
import { module as app } from './app'
import { persistStore, persistReducer } from 'redux-persist'
import createWorkerMiddleware from 'redux-worker-middleware'
import PointsWorker from '../workers/points.worker'
import storage from 'redux-persist/lib/storage'

const store = createStore([ app ], {
  middlewares: [
    createWorkerMiddleware(new PointsWorker),
  ],
  decorateReducer: reducer => {
    return persistReducer({
      key: 'data',
      storage
    }, reducer);
  }
})

persistStore(store)
const start = new Date()
start.setFullYear(start.getFullYear() - 1)

import { coins } from '../lib/coins'

let lastCoin = null
store.subscribe(() => {
  const { app: { currentCoin } } = store.getState()
  if (lastCoin !== currentCoin) {
    document.body.style.setProperty('--color-primary', coins.get(currentCoin).color)
    setTimeout(() => store.dispatch(app.actions.pointsRequest(
      coins.get(currentCoin).name, currentCoin, start
    )))
  }
  lastCoin = currentCoin
})

export { store }