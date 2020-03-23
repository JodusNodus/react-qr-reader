import { NoVideoInputDevicesError } from './error';

export const getFacingModePattern = (facingMode: VideoFacingModeEnum): RegExp =>
  facingMode === 'environment'
    ? /rear|back|environment/gi
    : /front|user|face/gi;

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

export const decodeQR = ({ data, width, height }: ImageData): any => {
  // eslint-disable-next-line no-restricted-globals
  const decoded = (self as any).jsQR(data, width, height, {
    inversionAttempts: 'attemptBoth',
  });

  let parsed = null;

  try {
    parsed = JSON.parse(decoded?.data);
  } catch (err) {
    parsed = decoded?.data;
  }

  return parsed;
};

export type LogOptions = {
  debug?: boolean;
};

export type Color = 'green' | 'red' | 'yellow' | 'white';

export const log = (msg: string, color: Color, { debug }: LogOptions): void => {
  if (debug) {
    console.log(`%c${msg}`, `color:${color};font-weight:bold;`);
  }
};

export const isFunction = (val: any) => typeof val === 'function';
