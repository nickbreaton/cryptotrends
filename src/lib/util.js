import { version } from '../../package.json'
import shortNumber from 'short-number'

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

export const formatDollar = points => d => {
  // format zero
  const centerIndex = Math.floor(points.length / 2)
  if (d === 0 && points[centerIndex].price >= 10) return '$0'
  // format other
  let num = shortNumber(d)
  if (typeof num === 'number' && num < 10) num = num.toFixed(2)
  return '$' + num
}

export const getCustomProperty = (property, element = document.body) => {
  return window.getComputedStyle(element).getPropertyValue(property)
}