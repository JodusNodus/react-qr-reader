import * as React from 'react';
import { useEffect, useRef } from 'react';

import { styles } from './styles';
import { useQrReader } from './hooks';

import { QrReaderProps } from '../types';

export const QrReader: React.FC<QrReaderProps> = ({
  videoContainerStyle,
  containerStyle,
  videoStyle,
  constraints,
  ViewFinder,
  scanDelay,
  className,
  onResult,
  videoId,
}) => {
  const [stopRequested] = useQrReader({
    constraints,
    scanDelay,
    onResult,
    videoId,
  });
  const isUnmounting = useRef(false);

  useEffect(
    () => () => {
      if (isUnmounting.current) {
        //Stop and remove all video based tracks from video media streams
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: false,
          })
          .then((mediaStream) =>
            mediaStream.getTracks().forEach((track) => {
              track.stop();
              mediaStream.removeTrack(track);
            })
          );
        stopRequested.current = true;
      }
      isUnmounting.current = true;
    },
    []
  );

  return (
    <section className={className} style={containerStyle}>
      <div
        style={{
          ...styles.container,
          ...videoContainerStyle,
        }}
      >
        {!!ViewFinder && <ViewFinder />}
        <video
          muted
          id={videoId}
          style={{
            ...styles.video,
            ...videoStyle,
            transform: constraints?.facingMode === 'user' && 'scaleX(-1)',
          }}
        />
      </div>
    </section>
  );
};

QrReader.displayName = 'QrReader';
QrReader.defaultProps = {
  constraints: {
    facingMode: 'user',
  },
  videoId: 'video',
  scanDelay: 500,
};
