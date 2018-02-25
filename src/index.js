import { render } from 'react-dom'
import Menu from './components/Menu'
import Graph from './components/Graph'
import React from 'react'
import { CoinConsumer, CoinProvider } from './components/CoinContext'
import { LocationFallback } from './components/Location'

const CoinColorObserver = () => (
  <CoinConsumer>
    {({ coin, isLoading }) => {
      document.body.style.setProperty('--color-primary', coin.color)
      return null
    }}
  </CoinConsumer>
)

// export { CoinProvider, CoinConsumer }

const App = () => (
  <CoinProvider>
    <LocationFallback />
    <CoinColorObserver />
    <Menu />
    <main>
      <Graph />
    </main>
  </CoinProvider>
)

render((
  <App />
), document.getElementById('root'))
