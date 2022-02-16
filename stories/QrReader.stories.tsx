import React, { useState } from 'react';
import { Story } from '@storybook/react';

import { ViewFinder } from './ViewFinder';

import { QrReader } from '../dist/esm';
import { QrReaderProps } from '../dist';

const styles = {
  container: {
    width: '400px',
    margin: 'auto',
  },
};

const Template: Story<QrReaderProps> = (args) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  return (
    <div style={styles.container}>
      <QrReader
        {...args}
        onResult={(result, error) => {
          if (result) {
            setData(result);
          }

          if (error) {
            setError(error.message);
          }
        }}
      />
      <p>The value is: {JSON.stringify(data, null, 2)}</p>
      <p>The error is: {error}</p>
    </div>
  );
};

export const ScanCode = Template.bind({});

ScanCode.args = {
  ViewFinder,
  videoId: 'video',
  scanDelay: 500,
  constraints: {
    facingMode: 'user',
  },
};

export default {
  title: 'Browser QR Reader',
  component: QrReader,
};
