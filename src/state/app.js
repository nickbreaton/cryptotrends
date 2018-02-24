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
  }),
  setCurrentCoin: code => ({
    type: 'CURRENT_COIN_SET',
    payload: code
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
  },
  CURRENT_COIN_SET: (state, action) => {
    state.currentCoin = action.payload
  }
}

export const module = {
  name: 'app',
  state,
  actions,
  mutations
}