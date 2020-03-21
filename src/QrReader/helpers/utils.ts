import { NoVideoInputDevicesError } from './error';

export const getFacingModePattern = (facingMode: VideoFacingModeEnum): RegExp =>
  facingMode == 'environment' ? /rear|back|environment/gi : /front|user|face/gi;

export const getDeviceId = async (
  facingMode: VideoFacingModeEnum
): Promise<string> => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(({ kind }) => kind === 'videoinput');

    if (videoDevices.length < 1) {
      throw new NoVideoInputDevicesError('No video input devices found');
    }

    const pattern = getFacingModePattern(facingMode);

    // Filter out video devices without the pattern
    const filteredDevices = videoDevices.filter(({ label }) =>
      pattern.test(label)
    );

    if (filteredDevices.length > 0) {
      const [first] = filteredDevices;
      return first.deviceId;
    }

    const [first, second] = videoDevices;

    if (videoDevices.length === 1 || facingMode === 'user') {
      return first.deviceId;
    }

    return second.deviceId;
  } catch (err) {
    throw err;
  }
};
