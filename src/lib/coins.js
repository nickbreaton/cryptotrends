import BTC from 'cryptocoins-icons/SVG/BTC.svg'
import ETH from 'cryptocoins-icons/SVG/ETH.svg'
import LTC from 'cryptocoins-icons/SVG/LTC.svg'
import STR from 'cryptocoins-icons/SVG/STR.svg'
import XMR from 'cryptocoins-icons/SVG/XMR.svg'
import XRP from 'cryptocoins-icons/SVG/XRP.svg'
import ZEC from 'cryptocoins-icons/SVG/ZEC-alt.svg'

export const coins = new Map([
  ['BTC', {
    name: 'Bitcoin',
    icon: BTC,
    color: '#fab915'
  }],
  ['ETH', {
    name: 'Ethereum',
    icon: ETH,
    color: '#FFF'
  }],
  ['XRP', {
    name: 'Ripple',
    icon: XRP,
    color: '#27a2db'
  }],
  ['LTC', {
    name: 'Litecoin',
    icon: LTC,
    color: '#989898'
  }],
  ['XMR', {
    name: 'Monero',
    icon: XMR,
    color: '#f26822'
  }],
  ['STR', {
    name: 'Stellar',
    icon: STR,
    color: '#cef0fa'
  }],
  ['ZEC', {
    name: 'Zcash',
    icon: ZEC,
    color: '#ce842a'
  }],
])

