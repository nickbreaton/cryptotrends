import { fetchPoloniexHistoricalPrice } from './lib/poloniex'
import { fetchGoogleTrendHistoricalInterest } from './lib/trends'
import { parseUnixTimestamp } from './lib/util'
import uniq from 'lodash.uniq'

async function fetchPoints(name, symbol, start, end) {
  const prices = await fetchPoloniexHistoricalPrice(symbol, start, end)
  const pricesStartDate = parseUnixTimestamp(prices[0].date)
  const interests = await fetchGoogleTrendHistoricalInterest(name, pricesStartDate, end)

  const potentialDates = [...prices, ...interests].map(entitiy => {
    return +(entitiy.date || entitiy.time)
  })

  const unqiueDates = uniq(potentialDates).sort()

  const potentialPoints = unqiueDates.map(date => {
    let price, interest;
    if (
      (price = prices.find(price => price.date === date)) &&
      (interest = interests.find(interest => +interest.time === date))
    ) return {
      date: parseUnixTimestamp(price.date),
      price: price.close,
      interest: interest.value[0]
    }
  })

  return potentialPoints.filter(Boolean)
}

;(async function () {
  const start = new Date()
  start.setUTCFullYear(start.getUTCFullYear() - 20)

  const data = await fetchPoints('Ethereum', 'ETH', start)

  console.log(data)
  document.write(`<pre>${JSON.stringify(data, null, 2)}</pre>`)
})()
