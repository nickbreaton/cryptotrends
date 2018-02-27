import { CoinConsumer } from './CoinContext'
import React from 'react'

const CoinColorObserver = () => (
  <CoinConsumer>
    {({ coin, isLoading }) => {
      document.body.style.setProperty('--color-primary', coin.color)
      return null
    }}
  </CoinConsumer>
)

export default CoinColorObserver