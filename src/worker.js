// jsQR is concatenated by gulp

self.addEventListener('message', function (e) {
  var decoded = jsQR(e.data.data, e.data.width, e.data.height)
  if (decoded) {
    postMessage({
      data: decoded.data,
      chunks: decoded.chunks
    })
  } else {
    postMessage(null)
  }
})
