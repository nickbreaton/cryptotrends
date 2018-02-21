import { fetchPoloniexHistoricalPrice } from './lib/poloniex'
import { fetchGoogleTrendHistoricalInterest } from './lib/trends'
import { parseUnixTimestamp } from './lib/util'

;(async function () {
  const start = new Date()
  start.setUTCFullYear(start.getUTCFullYear() - 1)
  start.setMinutes(0)
  start.setSeconds(0)
  start.setHours(0)

  const prices = await fetchPoloniexHistoricalPrice('btc', start)
  const pricesStartDate = parseUnixTimestamp(prices[0].date)
  const interests = await fetchGoogleTrendHistoricalInterest('Bitcoin', pricesStartDate)

  const data = interests.map(interest => {
    const price = prices.find(price => price.date == interest.time)
    return {
      date: parseUnixTimestamp(price.date),
      price: price.close,
      interest: interest.value[0]
    }
  })

  document.write(`
    <pre>${JSON.stringify(data, null, 2)}</pre>
  `)
})()
