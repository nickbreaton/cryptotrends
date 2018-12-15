import { coins } from '../lib/coins'
import { fetchPoints } from '../lib/points'
import { history, goToCoin, getCodes } from './Location'
import { mapRangeToUnixTimestamps } from '../lib/util'
import PointsWorker from '../workers/points.worker'
import React, { Component, createContext } from 'react'

const CoinContext = createContext()

class CoinProvider extends Component {
  state = {
    code: null,
    points: [],
    isLoading: true
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

    this.setState({ isLoading: true, code: coinCode })

    const points = await fetchPoints({
      start,
      end,
      timeCode,
      code: coinCode,
      name: coins.get(coinCode).name
    })

    this.setState({ points, isLoading: false })
  }
  render() {
    return (
      <CoinContext.Provider value={{
        coin: coins.get(this.state.code) || {},
        points: this.state.points,
        isLoading: this.state.isLoading
      }}>
        {this.props.children}
      </CoinContext.Provider>
    )
  }
}

export const CoinConsumer = CoinContext.Consumer
export { CoinProvider }
export default CoinContext