import React from 'react'

const Stringify = ({ value = {} }) => (
  <pre>{JSON.stringify(value, null, 2)}</pre>
)

export default Stringify