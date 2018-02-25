import { coins } from '../lib/coins'
import React from 'react'
import Location from './Location'

const items = Array.from(coins.entries()).map(([ code, coin ]) => ({
  code,
  ...coin
}))

const MenuItem = ({ isActive, name, onClick, color, icon: Icon }) => (
  <div onClick={onClick} className='menu__item' style={{ color: isActive && color }}>
    <Icon /> <span>{name}</span>
  </div>
)

const Menu = ({ setCurrentCoin }) => (
  <Location>
    {({ coinCode, goToCoin }) => (
      <aside className='menu'>
        {items.map(item => (
          <MenuItem
            {...item}
            key={item.code}
            isActive={item.code === coinCode}
            onClick={() => goToCoin(item.code)}
          />
        ))}
      </aside>
    )}
  </Location>
)

export default Menu