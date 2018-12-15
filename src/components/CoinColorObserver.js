import CoinContext from './CoinContext'
import React, { useContext } from 'react'

const CoinColorObserver = () => {
  const { coin } = useContext(CoinContext)
  document.body.style.setProperty('--color-primary', coin.color)
  return null
}

export default CoinColorObserver