import { getDeviceId } from './utils';

export type GetVideoStreamParams = {
  /**
   * Use custom camera constraints that the override default behavior.
   */
  constraints?: MediaTrackConstraintSet;
  /**
   * The camera to use, especify 'user' for front camera or 'environment' for back camera.
   */
  facingMode: VideoFacingModeEnum;
  /**
   * The resolution of the video (or image in legacyMode). Larger resolution will increase the accuracy but it will also slow down the processing time.
   */
  resolution?: number;
};

export const getVideoStream = async ({
  facingMode,
  constraints,
  resolution,
}: GetVideoStreamParams): Promise<MediaStream> => {
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

export type PrepareVideoStreamParams = {
  /**
   * Video element to use for setting camera stream
   */
  preview: HTMLVideoElement | any;
  /**
   * Camera stream to setup in the video element
   */
  stream: MediaStream;
};

export const prepareVideoStream = async ({
  preview,
  stream,
}: PrepareVideoStreamParams): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      if (!preview || !stream) {
        resolve();
      }

      window.URL =
        window.URL ||
        window.webkitURL ||
        (window as any).mozURL ||
        (window as any).msURL;

      if ('srcObject' in preview) {
        preview.srcObject = stream;
      } else if ('mozSrcObject' in preview) {
        preview.mozSrcObject = stream;
      } else {
        preview.src =
          (window.URL && window.URL.createObjectURL(stream)) || stream;
      }

      // IOS play in fullscreen
      preview.setAttribute('playsInline', true);

      resolve();
    } catch (err) {
      reject(err);
    }
  });
