import { toUnixTimestamp } from './util'

const ONE_DAY = 86400

export const fetchPoloniexHistoricalPrice = async (code, startDate, endDate) => {
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