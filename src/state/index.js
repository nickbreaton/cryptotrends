import { createStore } from 'redux-box'
import { module as app } from './app'
import { persistStore, persistReducer } from 'redux-persist'
import createWorkerMiddleware from 'redux-worker-middleware'
import PointsWorker from '../workers/points.worker'
import storage from 'redux-persist/lib/storage'

const store = createStore([ app ], {
  middlewares: [
    createWorkerMiddleware(new PointsWorker)
  ],
  decorateReducer: reducer => {
    return persistReducer({
      key: 'data',
      storage
    }, reducer);
  }
})

persistStore(store)

export { store }