import { fetchGoogleTrendHistoricalInterest } from '../lib/trends'
import { fetchPoloniexHistoricalPrice } from '../lib/poloniex'
import { parseUnixTimestamp, generatePersistKey } from '../lib/util'
import localForage from 'localforage'
import uniq from 'lodash.uniq'

self.addEventListener('message', async ({ data }) => {
  if (data.type === 'PointsWorker::request') {
    const { name, code, start, end, timeCode } = data.payload
    const persistKey = generatePersistKey(code, timeCode)

    let points = await localForage.getItem(persistKey)

    if (!points) {
      const prices = await fetchPoloniexHistoricalPrice(
        code,
        parseUnixTimestamp(start),
        parseUnixTimestamp(end)
      )
      const interests = await fetchGoogleTrendHistoricalInterest(
        name,
        parseUnixTimestamp(prices[0].date),
        parseUnixTimestamp(end)
      )

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

      points = potentialPoints.filter(Boolean)

      localForage.setItem(persistKey, points)
    }

    self.postMessage({
      type: 'PointsWorker::response',
      payload: points
    })
  }
})
