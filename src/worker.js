// jsQR is concatenated by gulp

self.addEventListener('message', function(e) {
  var decoded = jsQR(
    e.data.data,
    e.data.width,
    e.data.height
  )
  if (decoded) {
    var data = decoded.data
    var location = decoded.location
    var result = {data: data, location: location}
    postMessage(result)
  } else {
    postMessage(null)
  }
})
