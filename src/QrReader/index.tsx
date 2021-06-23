import * as React from 'react';

import { styles } from './styles';
import { useQrReader } from './hooks';

import { QrReaderProps } from '../types';

export const QrReader: React.FC<QrReaderProps> = ({
  constraints,
  ViewFinder,
  scanDelay,
  onResult,
  videoId,
}) => {
  useQrReader({
    constraints,
    scanDelay,
    onResult,
    videoId,
  });

  return (
    <section style={styles.container}>
      {!!ViewFinder && <ViewFinder />}
      <video
        muted
        id={videoId}
        style={{
          ...styles.video,
          transform: constraints?.facingMode === 'user' && 'scaleX(-1)',
        }}
      />
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
