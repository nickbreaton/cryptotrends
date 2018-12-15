import React, { useContext, useState } from 'react'
import Spinner from 'react-spinkit'
import CoinContext from './CoinContext'

const LoadingBoundary = ({ children }) => {
  const { isLoading } = useContext(CoinContext)
  const [hasLoadedOnce, setLoadedOnce] = useState(false)

  if (!isLoading && !hasLoadedOnce) {
    setLoadedOnce(true)
  }

  if (hasLoadedOnce) {
    return children
  }

  return (
    <div className='loading'>
      <Spinner name='line-scale' color='currentColor' fadeIn='half' />
    </div>
  )
}

export default LoadingBoundary