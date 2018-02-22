import 'regenerator-runtime/runtime'
import { createStore } from 'redux-box'
import { module as app } from './state/app'
import createWorkerMiddleware from 'redux-worker-middleware'
import Worker from './workers/my.worker'

const store = createStore([ app ], {
  middlewares: [
    createWorkerMiddleware(new Worker)
  ]
})

store.subscribe(() => {
  document.write(`
    <pre>${JSON.stringify(store.getState(), null, 2)}</pre>
  `)
})

const start = new Date()
start.setUTCFullYear(start.getUTCFullYear() - 1)

store.dispatch(app.actions.pointsRequest(
  'Bitcoin', 'BTC', start
))

