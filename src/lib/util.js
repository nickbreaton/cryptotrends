import { version } from '../../package.json'

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
    end: 9999999999
  }
}

export const generatePersistKey = (coinCode, timeCode) => {
  const d = new Date()
  const dd = d.getDate()
  const mm = d.getMonth() + 1
  const yyyy = d.getFullYear()
  return `${version}::${dd}.${mm}.${yyyy}::${coinCode}.${timeCode}`
}