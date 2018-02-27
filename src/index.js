import { CoinProvider } from './components/CoinContext'
import { getCustomProperty } from './lib/util'
import { LocationFallback } from './components/Location'
import { registerCache } from './lib/cache'
import { render } from 'react-dom'
import CoinColorObserver from './components/CoinColorObserver'
import GithubCorner from 'react-github-corner'
import Graph from './components/Graph'
import Key from './components/Key'
import Menu from './components/Menu'
import React from 'react'



const App = () => (
  <CoinProvider>
    <LocationFallback />
    <CoinColorObserver />
    <Menu />
    <main>
      <Graph />
      <Key />
    </main>
    <GithubCorner
      href='https://github.com/nickbreaton/cryptotrends'
      octoColor={getCustomProperty('--color-background')}
      bannerColor={getCustomProperty('--color-secondary')}
    />
  </CoinProvider>
)

render(<App />, document.getElementById('root'))
registerCache()