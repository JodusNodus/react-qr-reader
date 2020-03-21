import { Ref } from 'react';
import { useWorker } from '@koale/useworker';
import { useState, useEffect } from 'react';

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
  delay?: number | boolean;
  /**
   * If the device does not allow camera access (e.g. IOS Browsers, Safari) you can enable legacyMode to allow the user to take a picture (On a mobile device) or use an existing one.
   */
  legacyMode?: boolean;
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
  refs?: Ref<any>[];
  /**
   * Callbacks that the component uses
   */
  callbacks?: any[];
};

export const useQrReader: UseQrReaderHook = ({
  callbacks: [onScan, onLoad, onError],
  refs: [canvas, input, video, img],
  constraints,
  legacyMode,
  facingMode,
  resolution,
  delay,
}) => {
  const [decodeQrImage, status, killWorker] = useWorker(() => {}, {
    timeout: undefined,
    dependencies: [],
  });

  const [mirrorVideo, setMirrorVideo] = useState(false);
  const [streamLabel, setStreamLabel] = useState(null);
  const [stopCamera, setStopCamera] = useState(null);

  useEffect(() => {
    if (legacyMode) {
    } else {
    }

    return () => {
      killWorker();
    };
  }, []);

  return [mirrorVideo];
};
