export const fetchGoogleTrendHistoricalInterest = (keyword, startDate) => {
  const host = 'us-central1-nickbreaton.cloudfunctions.net'
  const url = `https://${host}/trends-proxy?keyword=${keyword}&startDate=${startDate}`
  return fetch(url)
    .then(res => res.json())
    .then(data => data.default.timelineData)
}