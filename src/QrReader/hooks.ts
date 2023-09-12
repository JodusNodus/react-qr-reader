import { MutableRefObject, useEffect, useRef } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';

import { StopRequestedException, UseQrReaderHook } from '../types';

import { isMediaDevicesSupported, isValidType } from './utils';

// TODO: add support for debug logs
export const useQrReader: UseQrReaderHook = ({
  scanDelay: delayBetweenScanAttempts,
  constraints: video,
  onResult,
  videoId,
}) => {
  const controlsRef: MutableRefObject<IScannerControls> = useRef(null);
  const stopRequested = useRef(false);

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
          if (stopRequested.current) {
            //Callback to parent function continuously runs after destruction of Video Element // Stream Video Tracks
            //Intentionally throwing exception to step out of parent function.
            throw new StopRequestedException();
          }
          if (isValidType(onResult, 'onResult', 'function')) {
            onResult(result, error, codeReader);
          }
        })
        .then((controls: IScannerControls) => (controlsRef.current = controls))
        .catch((error: Error) => {
          if (isValidType(onResult, 'onResult', 'function')) {
            onResult(null, error, codeReader);
          }
        });
    }

    return () => {
      controlsRef.current?.stop();
    };
  }, []);
  return [stopRequested];
};
