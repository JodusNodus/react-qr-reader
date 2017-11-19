const { NoVideoInputDevicesError } = require('./errors')

function defaultDeviceIdChooser(filteredDevices, videoDevices, facingMode) {
  if(filteredDevices.length > 0){
    return filteredDevices[0].deviceId
  }
  if(videoDevices.length == 1 || facingMode == 'user'){
    return videoDevices[0].deviceId
  }
  return videoDevices[1].deviceId
}

const getFacingModePattern = (facingMode) => facingMode == 'environment'
  ? /rear|back|environment/ig
  : /front|user|face/ig

function getDeviceId(facingMode, chooseDeviceId = defaultDeviceIdChooser) {
  // Get manual deviceId from available devices.
  return new Promise((resolve, reject) => {
    let enumerateDevices
    try{
      enumerateDevices = navigator.mediaDevices.enumerateDevices()
    }catch(err){
      reject(new NoVideoInputDevicesError())
    }
    enumerateDevices.then(devices => {
      // Filter out non-videoinputs
      const videoDevices = devices.filter(
        device => device.kind == 'videoinput'
      )

      if (videoDevices.length < 1) {
        reject(new NoVideoInputDevicesError())
        return
      }

      const pattern = getFacingModePattern(facingMode)

      // Filter out video devices without the pattern
      const filteredDevices = videoDevices.filter(({ label }) =>
        pattern.test(label))

      resolve(chooseDeviceId(filteredDevices, videoDevices, facingMode))
    })
  })
}

module.exports = { getDeviceId, getFacingModePattern }