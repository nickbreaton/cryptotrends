import React, { Fragment } from 'react'

const Entry = ({ color, label }) => (
  <div className='key__entry' style={{ color }}>
    <div className='key__entry__symbol' />
    <span className='key__entry__text'>{label}</span>
  </div>
)

const Key = () => (
  <div className='key'>
    <Entry color='var(--color-secondary)' label='Google Search Interest' />
    <Entry color='var(--color-primary)' label='Exchange Rate – USD' />
  </div>
)

export default Key