import { createSagas } from 'redux-box'

const state = {
  points: [],
  isLoading: false,
  currentCoin: 'ETH'
}

const actions = {
  pointsRequest: (name, symbol, start, end) => ({
    type: 'POINTS_REQUEST',
    meta: { WebWorker: true },
    payload: { name, symbol, end, start }
  }),
  pointsSuccess: points => ({
    type: 'POINTS_SUCCESS',
    payload: points
  }),
  pointsFailure: message => ({
    type: 'POINTS_FAILURE',
    payload: message
  })
}

const mutations = {
  POINTS_REQUEST: (state, action) => {
    state.isLoading = true
  },
  POINTS_SUCCESS: (state, action) => {
    state.points = action.payload
    state.isLoading = false
  },
  POINTS_FAILURE: (state, action) => {
    state.isLoading = false
  }
}

export const module = {
  name: 'app',
  state,
  actions,
  mutations
}