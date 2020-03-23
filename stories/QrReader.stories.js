import React, { useState, useRef } from 'react';
import { actions } from '@storybook/addon-actions';
import { QrReader } from '../src';

export default {
  title: 'QrReader',
};

const QrReaderWrapper = ({ selectFacingMode, selectDelay, onAndOff }) => {
  const [facingMode, setFacingMode] = useState('user');
  const [delay, setDelay] = useState(500);
  const [data, setData] = useState(null);
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
        <select onChange={(e) => setFacingMode(e.target.value)}>
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
            onChange={(e) => setDelay(parseInt(e.target.value))}
          />
        </div>
      )}
      {on && <QrReader debug={true} onScan={setData} facingMode={facingMode} />}
      <p>El valor escaneado es: {JSON.stringify(data, null, 2)}</p>
    </div>
  );
};

export const ChooseFacingMode = () => <QrReaderWrapper selectFacingMode />;

export const ChooseDelay = () => <QrReaderWrapper selectDelay />;

export const FacingModeNotSpecified = () => <QrReaderWrapper />;

export const OnAndOff = () => <QrReaderWrapper onAndOff />;
