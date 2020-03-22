import { useWorker } from '@koale/useworker';
import { useState, useEffect, useCallback } from 'react';

import { getImageData } from '../helpers/image';
import { isFunction, decodeQR } from '../helpers/utils';
import { getVideoStream, getVideoStreamTrack } from '../helpers/video';

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
   * The delay between scans in milliseconds.
   */
  delay?: number;
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
  delay,
  debug,
}) => {
  const [mirrorVideo, setMirrorVideo] = useState(false);
  const [streamTrack, setStreamTrack] = useState(null);

  const [decodeQrImage, _, terminateWorker] = useWorker(decodeQR, {
    dependencies: ['https://cdn.jsdelivr.net/npm/jsqr@1.2.0/dist/jsQR.min.js'],
    timeout: 5000,
  });

  const initQrScan = useCallback(async () => {
    let timeoutId = null;

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
      } else {
        clearTimeout(timeoutId);
      }

      if (debug) {
        console.info(
          `[QrReader]: Setting up Video Element and getting StreamTrack`
        );
      }

      const streamTrack: any = await getVideoStreamTrack({
        preview: preview.current,
        onLoadStart,
        stream,
      });

      if (debug) {
        console.info(`[QrReader]: Finish setup for video and StreamTrack`);
      }

      setMirrorVideo(facingMode === 'user');
      setStreamTrack(streamTrack);
    } catch (err) {
      if (isFunction(onError)) {
        onError(err);
      }

      timeoutId = setTimeout(initQrScan, 200);
    }
  }, []);

  const onLoadStart = useCallback(() => {
    if (!preview.current) {
      return;
    }

    if (debug) {
      console.info(`[QrReader]: Start playing MediaTrack on Video Element`);
    }

    preview.current.play();

    if (isFunction(onLoad)) {
      if (debug) {
        console.info(`[QrReader]: Calling onLoad if exists`);
      }

      onLoad({ mirrorVideo, streamTrack });
    }

    setTimeout(tryQrScan, delay);

    if (debug) {
      console.info(`[QrReader]: Cleaning event listeners`);
    }

    preview.current.removeEventListener('loadstart', onLoadStart);
  }, []);

  const tryQrScan = useCallback(async () => {
    let timeoutId = null;

    try {
      if (!preview.current || !canvas.current) {
        return;
      } else {
        clearTimeout(timeoutId);
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

      timeoutId = setTimeout(tryQrScan, delay);
    }
  }, []);

  useEffect(() => {
    initQrScan();

    return () => {
      terminateWorker();

      if (streamTrack) {
        streamTrack.stop();
      }
    };
  }, []);

  return [mirrorVideo];
};
