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
   * The delay between scans in milliseconds.
   */
  delay: number | boolean;
  /**
   * If the device does not allow camera access (e.g. IOS Browsers, Safari) you can enable legacyMode to allow the user to take a picture (On a mobile device) or use an existing one.
   */
  legacyMode: boolean;
  /**
   * The resolution of the video (or image in legacyMode). Larger resolution will increase the accuracy but it will also slow down the processing time.
   */
  resolution: number;
  /**
   * ClassName for the container element.
   */
  className: string;
  /**
   * Use custom camera constraints that the override default behavior.
   */
  constraints: MediaTrackConstraintSet;
  /**
   * Called when the image in legacyMode is loaded.
   */
  onImageLoad: any;
  /**
   * Called when an error occurs.
   */
  onError: any;
  /**
   * Scan event handler. Called every scan with the decoded value or null if no QR code was found.
   */
  onScan: any;
  /**
   * Called when the component is ready for use.
   */
  onLoad: any;
  /**
   * Styling for the container element. Warning The preview will always keep its 1:1 aspect ratio.
   */
  style: any;
}

export const QrReader: React.FunctionComponent<QrReaderProps> = ({
  showViewFinder,
  constraints,
  onImageLoad,
  facingMode,
  legacyMode,
  resolution,
  className,
  onError,
  onScan,
  onLoad,
  delay,
  style,
}: QrReaderProps) => {
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const imgRef = useRef(null);

  const [mirrorVideo] = useQrReader({
    refs: [canvasRef, inputRef, videoRef, imgRef],
    callbacks: [onScan, onLoad, onError],
    constraints,
    facingMode,
    legacyMode,
    resolution,
    delay,
  });

  return (
    <section className={className} style={style}>
      <section style={styles.container as any}>
        {!legacyMode && showViewFinder && (
          <div style={styles.viewFinder as any} />
        )}
        {!legacyMode && (
          <video
            ref={videoRef}
            style={
              {
                ...styles.videoPreview,
                transform: mirrorVideo && 'scaleX(-1)',
              } as any
            }
          />
        )}
        {legacyMode && (
          <>
            <input
              type="file"
              ref={inputRef}
              accept="image/*"
              style={styles.hidden}
              /** TODO: Remove this.handleInputChange */
              onChange={this.handleInputChange}
            />
            <img
              ref={imgRef}
              onLoad={onImageLoad}
              style={styles.imgPreview as any}
            />
          </>
        )}
        <canvas ref={canvasRef} style={styles.hidden} />
      </section>
    </section>
  );
};

QrReader.displayName = 'QrReader';
QrReader.defaultProps = {
  delay: 500,
  resolution: 600,
  constraints: null,
  showViewFinder: true,
  facingMode: 'environment',
};

export default QrReader;
