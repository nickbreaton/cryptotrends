export const parseUnixTimestamp = timestamp => {
  return new Date(+timestamp * 1000)
}

export const toUnixTimestamp = date => {
  return Math.floor(+date / 1000)
}