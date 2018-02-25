import BTC from 'cryptocoins-icons/SVG/BTC.svg'
import ETH from 'cryptocoins-icons/SVG/ETH.svg'
import LTC from 'cryptocoins-icons/SVG/LTC.svg'
import STR from 'cryptocoins-icons/SVG/STR.svg'
import XMR from 'cryptocoins-icons/SVG/XMR.svg'
import XRP from 'cryptocoins-icons/SVG/XRP.svg'
import ZEC from 'cryptocoins-icons/SVG/ZEC-alt.svg'

export const coins = new Map([
  ['BTC', {
    code: 'BTC',
    name: 'Bitcoin',
    icon: BTC,
    color: '#fab915'
  }],
  ['ETH', {
    code: 'ETH',
    name: 'Ethereum',
    icon: ETH,
    color: '#FFF'
  }],
  ['XRP', {
    code: 'XRP',
    name: 'Ripple',
    icon: XRP,
    color: '#27a2db'
  }],
  ['LTC', {
    code: 'LTC',
    name: 'Litecoin',
    icon: LTC,
    color: '#989898'
  }],
  ['XMR', {
    code: 'XMR',
    name: 'Monero',
    icon: XMR,
    color: '#f26822'
  }],
  ['STR', {
    code: 'STR',
    name: 'Stellar',
    icon: STR,
    color: '#cef0fa'
  }],
  ['ZEC', {
    code: 'ZEC',
    name: 'Zcash',
    icon: ZEC,
    color: '#ce842a'
  }],
])

