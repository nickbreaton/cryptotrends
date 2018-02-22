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

export function registerCache() {
  if (document.readyState === 'ready') {
    installServiceWorker()
  } else {
    window.addEventListener('load', installServiceWorker)
  }
}