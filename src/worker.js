// jsQR is concatenated by gulp

self.addEventListener('message', function(e) {
  var decoded = jsQR.decodeQRFromImage(
    e.data.data,
    e.data.width,
    e.data.height
  )
  postMessage(decoded)
})
