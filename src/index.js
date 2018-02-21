import { fetchPoloniexHistoricalPrice } from './lib/poloniex'
import { fetchGoogleTrendHistoricalInterest } from './lib/trends'
import { parseUnixTimestamp } from './lib/util'

async function fetchPointData(name, symbol, start, end) {
  const prices = await fetchPoloniexHistoricalPrice(symbol, start, end)
  const pricesStartDate = parseUnixTimestamp(prices[0].date)
  const interests = await fetchGoogleTrendHistoricalInterest(name, pricesStartDate, end)
  const data = interests.map(interest => {
    const price = prices.find(price => price.date == interest.time)
    return {
      date: parseUnixTimestamp(price.date),
      price: price.close,
      interest: interest.value[0]
    }
  })
  return data
}

;(async function () {
  const start = new Date()
  start.setUTCFullYear(start.getUTCFullYear() - 2)

  const data = await fetchPointData('Bitcoin', 'btc', start)

  console.log(data)
  document.write(`<pre>${JSON.stringify(data, null, 2)}</pre>`)
})()
