import { useWorker } from '@koale/useworker';
import { useState, useEffect, useCallback } from 'react';

import { getImageData } from '../helpers/image';
import { isFunction, decodeQR } from '../helpers/utils';
import { getVideoStream, prepareVideoStream } from '../helpers/video';

export type UseQrReaderHook = (
  props: UseQrReaderHookProps
) => UseQrReaderHookReturnType;

export type UseQrReaderHookReturnType = [boolean];

export type UseQrReaderHookProps = {
  /**
   * The camera to use, especify 'user' for front camera or 'environment' for back camera.
   */
  facingMode?: VideoFacingModeEnum;
  /**
   * The resolution of the video (or image in legacyMode). Larger resolution will increase the accuracy but it will also slow down the processing time.
   */
  resolution?: number;
  /**
   * Use custom camera constraints that the override default behavior.
   */
  constraints?: MediaTrackConstraintSet;
  /**
   * Refs of the elements that the components will render
   */
  refs?: any[];
  /**
   * Callbacks that the component uses
   */
  callbacks?: any[];
  /**
   * It enables debug logs to see what's going on with the QrReader
   */
  debug?: boolean;
};

export const useQrReader: UseQrReaderHook = ({
  callbacks: [onScan, onLoad, onError],
  refs: [canvas, preview],
  constraints,
  facingMode,
  resolution,
  debug,
}) => {
  const [mirrorVideo, setMirrorVideo] = useState(false);
  const [decodeQrImage, _, terminateWorker] = useWorker(decodeQR, {
    dependencies: ['https://cdn.jsdelivr.net/npm/jsqr@1.2.0/dist/jsQR.min.js'],
    timeout: 5000,
  });

  const initQrScan = useCallback(async () => {
    try {
      if (debug) {
        console.info(`[QrReader]: Initializing QrScanner`);
        console.info(`[QrReader]: Getting video stream to setup video element`);
      }

      const stream = await getVideoStream({
        constraints,
        resolution,
        facingMode,
      });

      if (!preview.current) {
        if (debug) {
          console.info(
            `[QrReader]: Video preview is not ready, retry initializing in 200ms`
          );
        }

        setTimeout(initQrScan, 200);
        return;
      }

      if (debug) {
        console.info(
          `[QrReader]: Setting up Video Element and getting StreamTrack`
        );
      }

      await prepareVideoStream({
        preview: preview.current,
        stream,
      });

      if (debug) {
        console.info(`[QrReader]: Finish setup for video and StreamTrack`);
      }

      if (debug) {
        console.info(`[QrReader]: Start playing MediaTrack on Video Element`);
      }

      preview.current.play();

      if (isFunction(onLoad)) {
        if (debug) {
          console.info(`[QrReader]: Calling onLoad if exists`);
        }

        onLoad({ mirrorVideo: facingMode === 'user', stream });
      }

      window.requestAnimationFrame(tryQrScan);

      return { mirrorVideo: facingMode === 'user', stream };
    } catch (err) {
      if (isFunction(onError)) {
        onError(err);
      }

      setTimeout(initQrScan, 200);

      return { mirrorVideo: facingMode === 'user', stream: null };
    }
  }, []);

  const tryQrScan = useCallback(async () => {
    try {
      if (!preview.current || !canvas.current) {
        return;
      }

      if (debug) {
        console.info(`[QrReader]: Starting to scan for QR codes`);
      }

      const data: any = await getImageData({
        preview: preview.current,
        canvas: canvas.current,
        resolution,
      });

      if (debug) {
        console.info(`[QrReader]: Getting image preview from MediaTrack`);
      }

      if (!!data) {
        if (debug) {
          console.info(`[QrReader]: Decoding image ...`);
        }

        const decoded: any = await decodeQrImage(data);

        if (debug) {
          console.info(`[QrReader]: Decoded image value: `, decoded);
        }

        if (isFunction(onScan)) {
          if (debug) {
            console.info(`[QrReader]: Calling onScan to pass decoded value`);
          }

          onScan(decoded);
        }
      }
    } catch (err) {
      if (isFunction(onError)) {
        onError(err);
      }
    } finally {
      if (debug) {
        console.info(`[QrReader]: Retry scan in another round ...`);
      }

      window.requestAnimationFrame(tryQrScan);
    }
  }, []);

  useEffect(() => {
    const { mirrorVideo, stream }: any = initQrScan();

    setMirrorVideo(mirrorVideo);

    return () => {
      if (debug) {
        console.info(`[QrReader]: Starting to unmount component`);
        console.info(`[QrReader]: Killing QR Reader WebWorker thread`);
      }

      terminateWorker();

      if (debug) {
        console.info(
          `[QrReader]: Trying to remove all tracks from videoStream`
        );
      }

      if (stream) {
        if (debug) {
          console.info(`[QrReader]: Removing all tracks from videoStream`);
        }

        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return [mirrorVideo];
};
