import { interestOverTime } from 'google-trends-api'
import xhook from 'xhook'

xhook.before(request => {
  request.url = request.url.replace('https://trends.google.com', '')
})

interestOverTime({
  keyword: 'Bitcoin',
}).then(console.log)

// fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD').then(res => res.json()).then(console.log)

// const googleTrends = require('google-trends-api')
// const axios = require('axios').default

// async function main() {
//   const resultsAsJSON = await googleTrends.interestOverTime({
//     keyword: 'Bitcoin',
//     startTime: new Date('2018-01-01')
//   })
//   const results = JSON.parse(resultsAsJSON)
//   const formatted = results.default.timelineData.map(datum => ({
//     a: console.log(datum.formattedAxisTime),
//     date: +datum.time,
//     interest: datum.value[0]
//   }))
//   console.log(formatted)
// }

// main()