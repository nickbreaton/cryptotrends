import xhook from 'xhook'
import GoogleTrendsAPI from 'google-trends-api'

xhook.before(request => {
  request.url = request.url.replace('https://trends.google.com', '')
})

export const fetchGoogleTrendHistoricalInterest = async (keyword, startDate) => {
  const raw = await GoogleTrendsAPI.interestOverTime({
    keyword,
    startTime: startDate,
    granularTimeResolution: true
  })
  return JSON.parse(raw).default.timelineData
}