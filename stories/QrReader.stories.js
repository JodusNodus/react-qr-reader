import React, { useState, useRef } from 'react';
import { actions } from '@storybook/addon-actions';
import { QrReader } from '../src';

export default {
  title: 'QrReader',
};

const QrReaderWrapper = ({
  selectFacingMode,
  selectDelay,
  legacyMode,
  onAndOff,
}) => {
  const [facingMode, setFacingMode] = useState('user');
  const [delay, setDelay] = useState(500);
  const [on, setOn] = useState(true);

  const ref = useRef({});

  return (
    <div style={{ width: '400px', margin: 'auto' }}>
      {onAndOff && (
        <button onClick={() => setOn(!on)}>
          {on ? 'Turn off' : 'Turn on'}
        </button>
      )}
      {selectFacingMode && (
        <select onChange={e => setFacingMode(e.target.value)}>
          <option value="user">User</option>
          <option value="environment">Environment</option>
        </select>
      )}
      {selectDelay && (
        <div>
          <button onClick={() => setDelay(false)}>Disable Delay</button>
          <input
            type="number"
            value={delay}
            placeholder="Delay in ms"
            onChange={e => setDelay(parseInt(e.target.value))}
          />
        </div>
      )}
      {on && (
        <QrReader
          ref={ref}
          delay={delay}
          maxImageSize={1000}
          facingMode={facingMode}
          legacyMode={legacyMode}
          onScan={actions('Scan')}
          onLoad={actions('Load')}
          onError={actions('Error')}
          className="reader-container"
          onImageLoad={actions('ImageLoad')}
        />
      )}
      {legacyMode && (
        <button onClick={() => ref.current.reader.openImageDialog()}>
          Open Image Dialog
        </button>
      )}
    </div>
  );
};

export const ChooseFacingMode = () => <QrReaderWrapper selectFacingMode />;

export const ChooseDelay = () => <QrReaderWrapper selectDelay />;

export const FacingModeNotSpecified = () => <QrReaderWrapper />;

export const LegacyMode = () => <QrReaderWrapper legacyMode />;

export const OnAndOff = () => <QrReaderWrapper onAndOff />;
