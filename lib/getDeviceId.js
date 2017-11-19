'use strict';

var _require = require('./errors'),
    NoVideoInputDevicesError = _require.NoVideoInputDevicesError;

function defaultDeviceIdChooser(filteredDevices, videoDevices, facingMode) {
  if (filteredDevices.length > 0) {
    return filteredDevices[0].deviceId;
  }
  if (videoDevices.length == 1 || facingMode == 'user') {
    return videoDevices[0].deviceId;
  }
  return videoDevices[1].deviceId;
}

var getFacingModePattern = function getFacingModePattern(facingMode) {
  return facingMode == 'environment' ? /rear|back|environment/ig : /front|user|face/ig;
};

function getDeviceId(facingMode) {
  var chooseDeviceId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultDeviceIdChooser;

  // Get manual deviceId from available devices.
  return new Promise(function (resolve, reject) {
    var enumerateDevices = void 0;
    try {
      enumerateDevices = navigator.mediaDevices.enumerateDevices();
    } catch (err) {
      reject(new NoVideoInputDevicesError());
    }
    enumerateDevices.then(function (devices) {
      // Filter out non-videoinputs
      var videoDevices = devices.filter(function (device) {
        return device.kind == 'videoinput';
      });

      if (videoDevices.length < 1) {
        reject(new NoVideoInputDevicesError());
        return;
      }

      var pattern = getFacingModePattern(facingMode);

      // Filter out video devices without the pattern
      var filteredDevices = videoDevices.filter(function (_ref) {
        var label = _ref.label;
        return pattern.test(label);
      });

      resolve(chooseDeviceId(filteredDevices, videoDevices, facingMode));
    });
  });
}

module.exports = { getDeviceId: getDeviceId, getFacingModePattern: getFacingModePattern };