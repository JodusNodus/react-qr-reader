import { useWorker } from '@koale/useworker';
import { useEffect, useRef } from 'react';

import { getImageData } from '../helpers/image';
import { isFunction, decodeQR, log } from '../helpers/utils';
import { getVideoStream, prepareVideoStream } from '../helpers/video';
import { clearFrames, clearPreview, clearStreams } from '../helpers/cleanup';

export type UseQrReaderHook = (
  props: UseQrReaderHookProps
) => UseQrReaderHookReturnType;

export type UseQrReaderHookReturnType = void;

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
  const cancelIds = useRef([]);
  const streams = useRef([]);

  // eslint-disable-next-line no-unused-vars
  const [decodeQrImage, _, clearWorker] = useWorker(decodeQR, {
    dependencies: ['https://cdn.jsdelivr.net/npm/jsqr@1.2.0/dist/jsQR.min.js'],
    timeout: 5000,
  });

  const tryQrScan = async () => {
    try {
      log(`[QrReader]: Starting to scan for QR codes`, 'white', { debug });

      const data: ImageData = await getImageData({
        preview: preview.current,
        canvas: canvas.current,
        resolution,
      });

      log(`[QrReader]: Getting image preview from MediaTrack`, 'white', {
        debug,
      });

      if (!!data) {
        log(`[QrReader]: Decoding image ...`, 'white', { debug });

        const decoded: any = await decodeQrImage(data);

        log(
          `[QrReader]: Decoded image value: ${JSON.stringify(
            decoded,
            null,
            2
          )}`,
          'white',
          { debug }
        );

        if (isFunction(onScan)) {
          log(`[QrReader]: Calling onScan to pass decoded value`, 'white', {
            debug,
          });

          onScan(decoded);
        }
      }
    } catch (err) {
      if (isFunction(onError)) {
        log(`[QrReader]: Calling onError to pass current error`, 'red', {
          debug,
        });

        onError(err);
      }
    } finally {
      log(`[QrReader]: Retry scan in another round ...`, 'yellow', { debug });

      cancelIds.current.push(window.requestAnimationFrame(tryQrScan));
    }
  };

  const initQrScan = async () => {
    try {
      log(`[QrReader]: Initializing QrScanner`, 'white', { debug });
      log(`[QrReader]: Getting video stream to setup video element`, 'white', {
        debug,
      });

      const stream = await getVideoStream({
        constraints,
        resolution,
        facingMode,
      });

      streams.current.push(stream);

      log(
        `[QrReader]: Setting up Video Element and getting StreamTrack`,
        'white',
        {
          debug,
        }
      );

      await prepareVideoStream({
        preview: preview.current,
        stream,
      });

      log(`[QrReader]: Finish setup for video and StreamTrack`, 'white', {
        debug,
      });
      log(`[QrReader]: Start playing MediaTrack on Video Element`, 'white', {
        debug,
      });

      await preview.current.play();

      if (isFunction(onLoad)) {
        log(`[QrReader]: Calling onLoad if exists`, 'white', { debug });
        onLoad({ stream });
      }

      cancelIds.current.push(window.requestAnimationFrame(tryQrScan));
    } catch (err) {
      if (isFunction(onError)) {
        log(`[QrReader]: Calling onError if exists`, 'red', { debug });
        onError(err);
      }
    }
  };

  useEffect(() => {
    const clearId = setTimeout(initQrScan, 500);

    return function willUnMount() {
      log(`[QrReader]: Starting to unmount component`, 'yellow', { debug });
      log(`[QrReader]: Killing QR Reader WebWorker thread`, 'yellow', {
        debug,
      });

      clearWorker();

      log(`[QrReader]: Trying to cancel timeouts`, 'yellow', { debug });

      clearTimeout(clearId);

      clearFrames(cancelIds.current, { debug });
      clearPreview(preview.current, { debug });
      clearStreams(streams.current, { debug });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
