export const getDeviceId = async (
  facingMode: VideoFacingModeEnum
): Promise<string> => {
  let videoInputDevices = await navigator.mediaDevices.enumerateDevices();

  videoInputDevices = videoInputDevices.filter(
    (deviceInfo: MediaDeviceInfo) => deviceInfo.kind === 'videoinput'
  );

  if (videoInputDevices.length < 1) {
    throw new Error('No video input devices found');
  }

  const regex =
    facingMode === 'environment'
      ? /rear|back|environment/gi
      : /front|user|face/gi;

  const devices = await Promise.all(
    videoInputDevices
      .filter((videoDevice: MediaDeviceInfo) => regex.test(videoDevice.label))
      .map(async (videoDevice: MediaDeviceInfo) => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: videoDevice.deviceId } },
          });

          stream.getVideoTracks().forEach((track) => {
            track.getCapabilities();
            track.getSettings();
          });

          stream.getTracks().forEach((track) => track.stop());

          return {
            deviceId: videoDevice.deviceId,
            streamError: false,
          };
        } catch (err) {
          return {
            deviceId: videoDevice.deviceId,
            streamError: true,
          };
        }
      })
  );

  const [device] = devices.filter((device) => !device.streamError);

  if (!device) {
    throw new Error('No video input devices found');
  }

  return device.deviceId;
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
