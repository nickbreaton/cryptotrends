import React, { Component } from 'react'
import { coins } from '../lib/coins'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const timeCodes = [
  'all',
  'year',
  'month',
  'week'
]

const getCodes = () => {
  const [_, coinCode, timeCode ] = history.location.pathname.split('/')
  return { coinCode, timeCode }
}

const goToCoin = code => {
  const { coinCode } = getCodes()
  history.push(history.location.pathname.replace(coinCode, code))
}

const goToTime = code => {
  const { timeCode } = getCodes()
  history.push(history.location.pathname.replace(timeCode, code))
}

class Location extends Component {
  state = {
    coinCode: null,
    timeCode: null
  }
  componentDidMount() {
    this.update()
    this.unlisten = history.listen(this.update)
  }
  componentWillUnmount() {
    this.unlisten()
  }
  update = () => {
    this.setState(getCodes)
  }
  render() {
    return this.props.children({
      ...this.state,
      goToCoin,
      goToTime
    })
  }
}

class LocationFallback extends Component {
  componentDidMount() {
    this.fallback()
    this.unlisten = history.listen(this.fallback)
  }
  componentWillUnmount() {
    this.unlisten()
  }
  fallback = () => {
    const { coinCode, timeCode } = getCodes()
    if (!coins.has(coinCode) || !timeCodes.includes(timeCode)) {
      history.replace('/BTC/year')
    }
  }
  render() {
    return null
  }
}

export { LocationFallback, goToCoin, goToTime, getCodes, history }
export default Location