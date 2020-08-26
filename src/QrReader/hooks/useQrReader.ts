import { useWorker } from '@koale/useworker';
import { useEffect, useRef, MutableRefObject } from 'react';

import { decodeQR } from '../helpers/utils';
import { getImageData } from '../helpers/image';
import { getVideoStream, prepareVideoStream } from '../helpers/video';
import { clearFrames, clearPreview, clearStreams } from '../helpers/cleanup';

export type UseQrReaderHook = (
  props: UseQrReaderHookProps
) => UseQrReaderHookReturnType;

export type UseQrReaderHookReturnType = void;

export type UseQrReaderRefs = [
  MutableRefObject<HTMLCanvasElement>,
  MutableRefObject<HTMLVideoElement>
];

export type UseQrReaderCallbacks = [
  OnLoadFunction,
  OnScanFunction,
  OnErrorFunction
];

// Callbacks
export type OnScanFunction = (decoded: any) => void;
export type OnLoadFunction = (stream: MediaStream) => void;
export type OnErrorFunction = (err: Error) => void;

// Data Types
export type DebugDataTypes = 'raw_data' | 'load' | 'value' | 'error';

// Debug Function
export type DebugFunction = (data: any, type: DebugDataTypes) => void;

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
  refs?: UseQrReaderRefs;
  /**
   * Callbacks that the hook uses
   */
  callbacks?: UseQrReaderCallbacks;
  /**
   * It enables debug logs to see what's going on with the QrReader
   */
  debug?: DebugFunction;
};

const JSQR = 'https://cdn.jsdelivr.net/npm/jsqr@1.2.0/dist/jsQR.min.js';

export const useQrReader: UseQrReaderHook = ({
  callbacks: [onLoad, onScan, onError],
  refs: [canvas, preview],
  constraints,
  facingMode,
  resolution,
  debug,
}) => {
  const cancelIds = useRef<number[]>([]);
  const streams = useRef<MediaStream[]>([]);

  // eslint-disable-next-line no-unused-vars
  const [decodeQrImage, { kill: clearWorker }] = useWorker(decodeQR, {
    remoteDependencies: [JSQR],
    autoTerminate: false,
  });

  const tryQrScan = async () => {
    try {
      const data: ImageData = await getImageData({
        preview: preview.current,
        canvas: canvas.current,
        resolution,
      });

      debug && debug(data, 'raw_data');

      if (!data) {
        throw '[QrReader]: error while trying to decode value';
      }

      const decoded: any = await decodeQrImage(data);

      if (typeof onScan === 'function') {
        debug && debug(decoded, 'value');
        onScan(decoded);
      }
    } catch (err) {
      if (typeof onError === 'function') {
        debug && debug(err, 'error');
        onError(err);
      }
    } finally {
      const cancelID = window.requestAnimationFrame(tryQrScan);
      cancelIds.current.push(cancelID);
    }
  };

  const initQrScan = async () => {
    try {
      const stream = await getVideoStream({
        constraints,
        resolution,
        facingMode,
      });

      streams.current.push(stream);

      await prepareVideoStream({
        preview: preview.current,
        stream,
      });

      await preview.current.play();

      if (typeof onLoad === 'function') {
        debug && debug(stream, 'load');
        onLoad(stream);
      }

      const cancelID = window.requestAnimationFrame(tryQrScan);
      cancelIds.current.push(cancelID);
    } catch (err) {
      if (typeof onError === 'function') {
        debug && debug(err, 'error');
        onError(err);
      }
    }
  };

  useEffect(() => {
    const clearId = setTimeout(initQrScan, 500);

    return () => {
      clearWorker();
      clearTimeout(clearId);
      clearFrames(cancelIds.current);
      clearPreview(preview.current);
      clearStreams(streams.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
