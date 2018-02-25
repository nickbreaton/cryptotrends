import { toUnixTimestamp } from './util'

const ONE_DAY = 86400
const DEFAULT_END = new Date(9999999999 * 1000)

export const fetchPoloniexHistoricalPrice = async (code, startDate, endDate = DEFAULT_END) => {
  const url = 'https://poloniex.com/public'
    + `?command=returnChartData`
    + `&period=${ONE_DAY}`
    + `&currencyPair=USDT_${code.toUpperCase()}`
    + `&end=${toUnixTimestamp(endDate)}`
    + `&start=${toUnixTimestamp(startDate)}`
  const response = await fetch(url)
  const data = await response.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data
}