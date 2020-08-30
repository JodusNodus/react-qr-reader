import styles from './styles';

import React, { useRef } from 'react';

import {
  useQrReader,
  OnErrorFunction,
  OnScanFunction,
  OnLoadFunction,
  DebugFunction,
} from './hooks/useQrReader';

export type QrReaderProps = {
  /**
   * The camera to use, especify 'user' for front camera or 'environment' for back camera.
   */
  facingMode: VideoFacingModeEnum;
  /**
   * The resolution of the video (or image in legacyMode). Larger resolution will increase the accuracy but it will also slow down the processing time.
   */
  resolution: number;
  /**
   * ClassName for the container element.
   */
  className?: string;
  /**
   * Use custom camera constraints that the override default behavior.
   */
  constraints?: MediaTrackConstraintSet;
  /**
   * Called when an error occurs.
   */
  onError?: OnErrorFunction;
  /**
   * Scan event handler. Called every scan with the decoded value or null if no QR code was found.
   */
  onScan?: OnScanFunction;
  /**
   * Called when the component is ready for use.
   */
  onLoad?: OnLoadFunction;
  /**
   * Styling for the container element. Warning The preview will always keep its 1:1 aspect ratio.
   */
  style?: any;
  /**
   * Function that takes a context and gives you the choice to log
   */
  debug?: DebugFunction;
  /**
   * Property that represents the view finder component
   */
  ViewFinder: (props: any) => React.ReactElement<any, any> | null;
};

export const QrReader: React.FunctionComponent<QrReaderProps> = ({
  constraints,
  facingMode,
  resolution,
  ViewFinder,
  className,
  onError,
  onScan,
  onLoad,
  style,
  debug,
}: QrReaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useQrReader({
    callbacks: [onLoad, onScan, onError],
    refs: [canvasRef, videoRef],
    constraints,
    facingMode,
    resolution,
    debug,
  });

  return (
    <section className={className} style={style}>
      <section style={styles.container as any}>
        {!!ViewFinder && <ViewFinder />}
        <video
          muted
          ref={videoRef}
          style={
            {
              ...styles.videoPreview,
              transform: facingMode === 'user' && 'scaleX(-1)',
            } as any
          }
        />
        <canvas ref={canvasRef} style={styles.hidden} />
      </section>
    </section>
  );
};

QrReader.displayName = 'QrReader';
QrReader.defaultProps = {
  resolution: 600,
  constraints: null,
  facingMode: 'environment',
};

export default QrReader;
