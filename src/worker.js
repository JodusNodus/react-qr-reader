self.addEventListener('message', function(e) {
  var decoded = jsQR.decodeQRFromImage(
    e.data.imageData.data,
    e.data.imageData.width,
    e.data.imageData.height
  )
  postMessage(decoded)
})
