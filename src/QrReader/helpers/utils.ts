export const getFacingModePattern = (facingMode: VideoFacingModeEnum): RegExp =>
  facingMode === 'environment'
    ? /rear|back|environment/gi
    : /front|user|face/gi;

export const getDeviceId = async (
  facingMode: VideoFacingModeEnum
): Promise<string> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(({ kind }) => kind === 'videoinput');

  if (videoDevices.length < 1) {
    throw new Error('No video input devices found');
  }

  const pattern = getFacingModePattern(facingMode);

  // Filter out video devices without the pattern
  const filteredDevices = videoDevices.filter(({ label }) =>
    pattern.test(label)
  );

  const [filtered] = filteredDevices;

  if (filtered) {
    return filtered.deviceId;
  }

  const [first, second] = videoDevices;

  return videoDevices.length === 1 || facingMode === 'user'
    ? first.deviceId
    : second.deviceId;
};

export const decodeQR = ({ data, width, height }: ImageData): any => {
  // eslint-disable-next-line no-restricted-globals
  const decoded = (self as any).jsQR(data, width, height, {
    inversionAttempts: 'attemptBoth',
  });

  try {
    return JSON.parse(decoded?.data);
  } catch (err) {
    return decoded?.data;
  }
};
