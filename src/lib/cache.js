import { coins } from './coins'
import { generatePersistKey, mapRangeToUnixTimestamps } from './util'
import localForage from 'localforage'
import { fetchPoints } from './points'

async function installServiceWorker() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('sw.js')
      console.log('Service worker registerd.')
    } catch (ignore) {
      console.warn('Service failed to register.')
    }
  }
}

async function prefetchChartData() {
  const timeCode = 'year'
  for (const coin of coins.values()) {
    const { start, end } = mapRangeToUnixTimestamps(timeCode)
    const persistKey = generatePersistKey(coin.code, timeCode)
    const isCached = Boolean(await localForage.getItem(persistKey))
    if (!isCached) {
      await fetchPoints({
        start,
        end,
        timeCode,
        code: coin.code,
        name: coin.name
      })
    }
  }
}

export function registerCache() {
  // install service worker asap
  if (document.readyState === 'ready') {
    installServiceWorker()
  } else {
    window.addEventListener('load', installServiceWorker)
  }
  // run caching asap even before loading entire page
  prefetchChartData()
}