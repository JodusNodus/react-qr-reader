'use strict';

module.exports = function getDeviceId(facingMode) {
  // Get manual deviceId from available devices.
  return new Promise(function (resolve, reject) {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      // Filter out non-videoinputs
      var videoDevices = devices.filter(function (device) {
        return device.kind == 'videoinput';
      });

      if (videoDevices.length < 1) {
        reject(new Error('No video input devices found'));
        return;
      } else if (videoDevices.length == 1) {
        // Only 1 video device available thus stop here
        resolve(devices[0].deviceId);
        return;
      }

      var pattern = facingMode == 'rear' ? /rear|back|environment/ig : /front|user|face/ig;

      // Filter out video devices without the pattern
      var filteredDevices = videoDevices.filter(function (_ref) {
        var label = _ref.label;
        return pattern.test(label);
      });

      if (filteredDevices.length > 0) {
        resolve(filteredDevices[0].deviceId);
      } else {
        // No device found with the pattern thus use another video device
        resolve(videoDevices[0].deviceId);
      }
    });
  });
};