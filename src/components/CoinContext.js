import { coins } from '../lib/coins'
import { mapRangeToUnixTimestamps } from '../lib/util'
import createContext from 'create-react-context'
import { history, goToCoin, getCodes } from './Location'
import PointsWorker from '../workers/points.worker'
import React, { Component } from 'react'

const { Provider, Consumer } = createContext()

class CoinProvider extends Component {
  state = {
    code: null,
    points: [],
    isLoading: false
  }
  pointsWorker = new PointsWorker()
  componentDidMount() {
    this.fetchCoin()
    this.unlisten = history.listen(this.fetchCoin)
  }
  componentWillUnmount() {
    this.unlisten()
  }
  fetchCoin = () => {
    const { coinCode, timeCode } = getCodes()
    const { start, end } = mapRangeToUnixTimestamps(timeCode)

    this.setState({ isLoading: true })

    this.pointsWorker.postMessage({
      type: 'PointsWorker::request',
      payload: {
        code: coinCode, start, end,
        name: coins.get(coinCode).name
      }
    })

    this.pointsWorker.addEventListener('message', ({ data }) => {
      if (data.type === 'PointsWorker::response') {
        this.setState({
          code: coinCode,
          points: data.payload,
          isLoading: false
        })
      }
    })
  }
  render() {
    return (
      <Provider value={{
        coin: coins.get(this.state.code) || {},
        points: this.state.points,
        isLoading: this.state.isLoading
      }}>
        {this.props.children}
      </Provider>
    )
  }
}

export { CoinProvider, Consumer as CoinConsumer }