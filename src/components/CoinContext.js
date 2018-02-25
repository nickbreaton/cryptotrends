import { coins } from '../lib/coins'
import { fetchPoints } from '../lib/points'
import { history, goToCoin, getCodes } from './Location'
import { mapRangeToUnixTimestamps } from '../lib/util'
import createContext from 'create-react-context'
import PointsWorker from '../workers/points.worker'
import React, { Component } from 'react'

const { Provider, Consumer } = createContext()

class CoinProvider extends Component {
  state = {
    code: null,
    points: [],
    isLoading: false
  }

  componentDidMount() {
    this.fetchCoin()
    this.unlisten = history.listen(this.fetchCoin)
  }
  componentWillUnmount() {
    this.unlisten()
  }
  fetchCoin = async () => {
    const { coinCode, timeCode } = getCodes()
    const { start, end } = mapRangeToUnixTimestamps(timeCode)

    this.setState({ isLoading: true })

    const points = await fetchPoints({
      start,
      end,
      timeCode,
      code: coinCode,
      name: coins.get(coinCode).name
    })

    this.setState({ points, code: coinCode, isLoading: false })
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