import { fetchGoogleTrendHistoricalInterest } from '../lib/trends'
import { fetchPoloniexHistoricalPrice } from '../lib/poloniex'
import { module } from '../state/app'
import { parseUnixTimestamp } from '../lib/util'
import uniq from 'lodash.uniq'

self.onmessage = async ({ data: action }) => {
  if (action.type === 'POINTS_REQUEST') {
    try {
      const { name, symbol, start, end } = action.payload

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

      const points = potentialPoints.filter(Boolean)

      self.postMessage(module.actions.pointsSuccess(points))

    } catch (error) {
      self.postMessage(module.actions.pointsFailure(error.toString()))
    }
  }
}
