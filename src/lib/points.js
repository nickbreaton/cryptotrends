import PointsWorker from '../workers/points.worker'

const pointsWorker = new PointsWorker()

export const fetchPoints = payload => new Promise(resolve => {
  pointsWorker.postMessage({
    type: 'PointsWorker::request',
    payload
  })

  pointsWorker.addEventListener('message', ({ data }) => {
    if (data.type === 'PointsWorker::response') {
      resolve(data.payload)
    }
  })
})