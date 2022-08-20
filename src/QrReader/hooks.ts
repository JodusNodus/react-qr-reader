import { MutableRefObject, useEffect, useRef } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';

import { UseQrReaderHook } from '../types';

import { isMediaDevicesSupported, isValidType } from './utils';

// TODO: add support for debug logs
export const useQrReader: UseQrReaderHook = ({
  scanDelay: delayBetweenScanAttempts,
  constraints: video,
  onResult,
  videoId,
}) => {
  /**
   * The ref has 3 possible states:
   * undefined - reader is not initialized
   * null - useEffect cleanup was called so we should throw an error if the decode Promise resolves
   * IScannerControls - reader is initialized and ready to be used
   */
  const controlsRef: MutableRefObject<IScannerControls | null | undefined> =
    useRef(undefined);
  useEffect(() => {
    const codeReader = new BrowserQRCodeReader(null, {
      delayBetweenScanAttempts,
    });

    if (
      !isMediaDevicesSupported() &&
      isValidType(onResult, 'onResult', 'function')
    ) {
      const message =
        'MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"';

      onResult(null, new Error(message), codeReader);
    }

    if (isValidType(video, 'constraints', 'object')) {
      codeReader
        .decodeFromConstraints({ video }, videoId, (result, error) => {
          if (isValidType(onResult, 'onResult', 'function')) {
            if (controlsRef.current === null) {
              throw new Error('Component is unmounted');
            }
            onResult(result, error, codeReader);
          }
        })
        .then((controls: IScannerControls) => {
          if (controlsRef.current === undefined) {
            controlsRef.current = controls;
          }
        })
        .catch((error: Error) => {
          if (isValidType(onResult, 'onResult', 'function')) {
            onResult(null, error, codeReader);
          }
        });
    }

    return () => {
      if (controlsRef.current === undefined) {
        /** invalidate the ref as the component is unmounted */
        controlsRef.current = null;
      } else {
        controlsRef.current?.stop();
      }
    };
  }, []);
};
