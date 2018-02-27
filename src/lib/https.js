function request({ method, host, path }, callback) {
  const listeners = {}

  const res = {
    on: (type, listener) => {
      if (type === 'data') {
        listeners.data = listener
      }
      if (type === 'end') {
        listeners.end = listener
      }
    }
  }

  const req = {
    on: (type, listener) => {
      if (type === 'error') {
        listeners.error = listener
      }
    },
    end: () => {}
  }

  fetch(`https://${host}${path}`, { method })
    .then(res => res.text())
    .then(data => {
      listeners.data(data)
      listeners.end()
    })
    .catch(error => {
      listeners.error(error)
    })

  callback(res)
  return req
}

module.exports = { request }