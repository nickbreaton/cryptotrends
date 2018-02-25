export const parseUnixTimestamp = timestamp => {
  return new Date(+timestamp * 1000)
}

export const toUnixTimestamp = date => {
  return Math.floor(+date / 1000)
}

export const mapRangeToUnixTimestamps = () => {
  const start = new Date()
  start.setFullYear(start.getFullYear() - 1)
  return {
    start: toUnixTimestamp(start),
    end: toUnixTimestamp(new Date())
  }
}