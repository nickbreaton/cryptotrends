import { CoinConsumer, CoinProvider } from './components/CoinContext'
import { LocationFallback } from './components/Location'
import { registerCache } from './lib/cache'
import { render } from 'react-dom'
import Graph from './components/Graph'
import Key from './components/Key'
import Menu from './components/Menu'
import React from 'react'

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
      <Key />
    </main>
  </CoinProvider>
)

render(<App />, document.getElementById('root'))
registerCache()