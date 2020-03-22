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
};

export const useQrReader: UseQrReaderHook = ({
  callbacks: [onScan, onLoad, onError],
  refs: [canvas, preview],
  constraints,
  facingMode,
  resolution,
  delay,
}) => {
  const [mirrorVideo, setMirrorVideo] = useState(false);
  const [streamTrack, setStreamTrack] = useState(null);

  const [decodeQrImage, _, terminateWorker] = useWorker(decodeQR, {
    dependencies: ['https://cdn.jsdelivr.net/npm/jsqr@1.2.0/dist/jsQR.min.js'],
    timeout: 200,
  });

  const initQrScan = useCallback(async () => {
    let timeoutId = null;

    try {
      const stream = await getVideoStream({ facingMode, constraints });

      if (!preview.current) {
        setTimeout(initQrScan, 200);
        return;
      } else {
        clearTimeout(timeoutId);
      }

      const streamTrack: any = await getVideoStreamTrack({
        preview: preview.current,
        onLoadStart,
        stream,
      });

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

    preview.current.play();

    if (isFunction(onLoad)) {
      onLoad({ mirrorVideo, streamTrack });
    }

    setTimeout(tryQrScan, delay);

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

      const data: any = await getImageData({
        preview: preview.current,
        canvas: canvas.current,
        resolution,
      });

      if (!!data) {
        const decoded: any = await decodeQrImage(data);

        console.info('Decoding QR', decoded);

        if (isFunction(onScan)) {
          onScan(decoded);
        }
      }
    } catch (err) {
      if (isFunction(onError)) {
        onError(err);
      }
    } finally {
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
