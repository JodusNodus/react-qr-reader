import styles from './styles';

import 'webrtc-adapter';
import React, { useRef } from 'react';

import { useQrReader } from './hooks/useQrReader';

export interface QrReaderProps {
  /**
   * The camera to use, especify 'user' for front camera or 'environment' for back camera.
   */
  facingMode: VideoFacingModeEnum;
  /**
   * Show or hide the build in view finder.
   */
  showViewFinder: boolean;
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
  onError?: any;
  /**
   * Scan event handler. Called every scan with the decoded value or null if no QR code was found.
   */
  onScan?: any;
  /**
   * Called when the component is ready for use.
   */
  onLoad?: any;
  /**
   * Styling for the container element. Warning The preview will always keep its 1:1 aspect ratio.
   */
  style?: any;
  /**
   * It enables debug logs to see what's going on with the QrReader
   */
  debug?: boolean;
  /**
   * Color to display in viewFinder
   */
  viewFinderColor?: string;

  /**
   * Width for view finder line borders
   */
  viewFinderStrokeWidth?: string;
}

export const QrReader: React.FunctionComponent<QrReaderProps> = ({
  viewFinderStrokeWidth,
  viewFinderColor,
  showViewFinder,
  constraints,
  facingMode,
  resolution,
  className,
  onError,
  onScan,
  onLoad,
  style,
  debug,
}: QrReaderProps) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useQrReader({
    callbacks: [onScan, onLoad, onError],
    refs: [canvasRef, videoRef],
    constraints,
    facingMode,
    resolution,
    debug,
  });

  return (
    <section className={className} style={style}>
      <section style={styles.container as any}>
        {showViewFinder && (
          <svg
            width="50px"
            viewBox="0 0 100 100"
            style={styles.viewFinder as any}
          >
            <path
              fill="none"
              d="M13,0 L0,0 L0,13"
              stroke={viewFinderColor}
              strokeWidth={viewFinderStrokeWidth}
            />
            <path
              fill="none"
              d="M0,87 L0,100 L13,100"
              stroke={viewFinderColor}
              strokeWidth={viewFinderStrokeWidth}
            />
            <path
              fill="none"
              d="M87,100 L100,100 L100,87"
              stroke={viewFinderColor}
              strokeWidth={viewFinderStrokeWidth}
            />
            <path
              fill="none"
              d="M100,13 L100,0 87,0"
              stroke={viewFinderColor}
              strokeWidth={viewFinderStrokeWidth}
            />
          </svg>
        )}
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
  showViewFinder: true,
  facingMode: 'environment',
  viewFinderColor: 'rgba(255, 0, 0, 0.5)',
  viewFinderStrokeWidth: '5',
};

export default QrReader;
