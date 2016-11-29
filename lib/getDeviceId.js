'use strict';

module.exports = function getDeviceId(facingMode) {
  return new Promise(function (resolve, reject) {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      devices = devices.filter(function (x) {
        return x.kind == 'videoinput';
      });

      if (devices.length < 1) {
        reject();
      } else if (devices.length < 2) {
        resolve(devices[0].deviceId);
        return;
      } else {
        (function () {
          var pattern = facingMode == 'rear' ? /rear|back|environment/ig : /front|user|face/ig;

          var facingModeDevices = devices.filter(function (x) {
            return pattern.test(x.label);
          });

          if (facingModeDevices.length > 0) {
            resolve(facingModeDevices[0].deviceId);
          } else {
            resolve();
          }
        })();
      }
    });
  });
};