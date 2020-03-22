import { getDeviceId } from './utils';

export const getVideoStream = async ({
  facingMode,
  constraints,
  resolution,
}) => {
  // Check browser facingMode constraint support
  // Firefox ignores facingMode or deviceId constraints
  const isFirefox = /firefox/i.test(navigator?.userAgent);

  const supportedConstraints: any = navigator?.mediaDevices?.getSupportedConstraints();
  const defaultConstraints: any = {
    width: { min: resolution },
  };

  if (supportedConstraints?.facingMode) {
    defaultConstraints.facingMode = { ideal: facingMode };
  }

  if (supportedConstraints?.frameRate) {
    defaultConstraints.frameRate = { ideal: 25, min: 10 };
  }

  let video = null;

  if (supportedConstraints.facingMode || isFirefox) {
    video = constraints || defaultConstraints;
  } else {
    const deviceId = await getDeviceId(facingMode);

    video = {
      ...{ deviceId },
      ...constraints,
    };
  }

  return await navigator.mediaDevices.getUserMedia({ video });
};

export const getVideoStreamTrack = async ({ preview, stream, onLoadStart }) =>
  new Promise((resolve) => {
    // Handle different browser implementations of MediaStreams as src
    if (preview.srcObject !== undefined) {
      preview.srcObject = stream;
    } else if (preview.mozSrcObject !== undefined) {
      preview.mozSrcObject = stream;
    } else if (window.URL.createObjectURL) {
      preview.src = window.URL.createObjectURL(stream);
    } else if (window.webkitURL) {
      preview.src = window.webkitURL.createObjectURL(stream);
    } else {
      preview.src = stream;
    }

    // IOS play in fullscreen
    preview.playsInline = true;
    preview.addEventListener('loadstart', onLoadStart);

    const [streamTrack] = stream.getTracks();

    resolve(streamTrack);
  });
