module.exports = function getDeviceId(facingMode){
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      devices = devices
      .filter(x => x.kind == 'videoinput')

      if(devices.length < 1){
        reject()
      }else if(devices.length < 2){
        resolve(devices[0].deviceId)
        return
      }else{
        const pattern = facingMode == 'rear'
        ? /rear|back|environment/ig
        : /front|user|face/ig

        const facingModeDevices = devices
        .filter(x => pattern.test(x.label))

        if(facingModeDevices.length > 0){
          resolve(facingModeDevices[0].deviceId)
        }else{
          resolve()
        }
      }
    })
  })
}
