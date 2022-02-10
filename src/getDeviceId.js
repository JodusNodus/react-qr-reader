const { NoVideoInputDevicesError } = require("./errors");

function defaultDeviceIdChooser(
  filteredDevices,
  videoDevices,
  facingMode,
  deviceIdOffset
) {
  if (filteredDevices.length > 0) {
    function labelCompare(a, b) {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }
      return 0;
    }
    filteredDevices.sort(labelCompare);
    return filteredDevices.length < deviceIdOffset
      ? filteredDevices[filteredDevices.length - 1].deviceId
      : filteredDevices[deviceIdOffset].deviceId;
  }
  if (videoDevices.length == 1 || facingMode == "user") {
    return videoDevices[0].deviceId;
  }
  return videoDevices.length < 1 + deviceIdOffset
    ? videoDevices[filteredDevices.length - 1].deviceId
    : videoDevices[1 + deviceIdOffset].deviceId;
}

const getFacingModePattern = (facingMode) =>
  facingMode == "environment"
    ? /rear|back|environment|webcan/gi
    : /front|user|face/gi;

function getDeviceId(
  facingMode,
  deviceIdOffset,
  chooseDeviceId = defaultDeviceIdChooser
) {
  // Get manual deviceId from available devices.
  return new Promise((resolve, reject) => {
    let enumerateDevices;
    try {
      enumerateDevices = navigator.mediaDevices.enumerateDevices();
    } catch (err) {
      reject(new NoVideoInputDevicesError());
    }
    enumerateDevices.then((devices) => {
      // Filter out non-videoinputs
      const videoDevices = devices.filter(
        (device) => device.kind == "videoinput"
      );

      if (videoDevices.length < 1) {
        reject(new NoVideoInputDevicesError());
        return;
      }

      const pattern = getFacingModePattern(facingMode);

      // Filter out video devices without the pattern
      const filteredDevices = videoDevices.filter(({ label }) =>
        pattern.test(label)
      );

      resolve(
        chooseDeviceId(
          filteredDevices,
          videoDevices,
          facingMode,
          deviceIdOffset
        )
      );
    });
  });
}

module.exports = { getDeviceId, getFacingModePattern };
