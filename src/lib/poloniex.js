import { toUnixTimestamp } from './util'

const ONE_DAY = 86400
const DEFAULT_END = new Date(9999999999 * 1000)

export const fetchPoloniexHistoricalPrice = async (symbol, startDate, endDate = DEFAULT_END) => {
  const url = new URL('https://poloniex.com/public')
  url.searchParams.append('command', 'returnChartData')
  url.searchParams.append('period', ONE_DAY)
  url.searchParams.append('currencyPair', `USDT_${symbol.toUpperCase()}`)
  url.searchParams.append('end', toUnixTimestamp(endDate))
  url.searchParams.append('start', toUnixTimestamp(startDate))
  const response = await fetch(url.toString())
  return await response.json()
}