import { coins } from '../lib/coins'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { module as app } from '../state/app'
import React from 'react'

const items = Array.from(coins.entries()).map(([ symbol, coin ]) => ({
  symbol,
  ...coin
}))

const Menu = ({ currentCoin, setCurrentCoin }) => (
  <aside className='menu'>
    {items.map((item, i) => (
      <div
        key={item.symbol}
        onClick={() => setCurrentCoin(item.symbol)}
        className={`menu__item ${currentCoin === item.symbol ? 'menu__item--active' : ''}`}
      >
        <item.icon /> <span>{item.name}</span>
      </div>
    ))}
  </aside>
)

export default connect(
  state => ({
    currentCoin: state.app.currentCoin
  }),
  dispatch => bindActionCreators({
    setCurrentCoin: app.actions.setCurrentCoin
  }, dispatch)
)(Menu)