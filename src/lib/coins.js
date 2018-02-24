import BTC from 'cryptocoins-icons/SVG/BTC.svg'
import ETH from 'cryptocoins-icons/SVG/ETH.svg'
import XRP from 'cryptocoins-icons/SVG/XRP.svg'
import LTC from 'cryptocoins-icons/SVG/LTC.svg'
import DOGE from 'cryptocoins-icons/SVG/DOGE.svg'

export const coins = new Map([
  ['BTC', {
    name: 'Bitcoin',
    icon: BTC,
    color: '#fab915'
  }],
  ['ETH', {
    name: 'Ethereum',
    icon: ETH,
    color: '#ECF0F1'
  }],
  ['XRP', {
    name: 'Ripple',
    icon: XRP,
    color: '#27a2db'
  }],
  ['LTC', {
    name: 'Litecoin',
    icon: LTC,
    color: '#88CBF5'
  }],
  ['DOGE', {
    name: 'Dogecoin',
    icon: DOGE,
    color: '#ba9f33'
  }]
])

