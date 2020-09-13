import React, { useState } from 'react';

import { QrReader } from '../src';

export default {
  title: 'QrReader',
};

const ViewFinder = () => (
  <>
    <svg
      width="50px"
      viewBox="0 0 100 100"
      style={{
        top: 0,
        left: 0,
        zIndex: 1,
        boxSizing: 'border-box',
        border: '50px solid rgba(0, 0, 0, 0.3)',
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      <path
        fill="none"
        d="M13,0 L0,0 L0,13"
        stroke="rgba(255, 0, 0, 0.5)"
        strokeWidth="5"
      />
      <path
        fill="none"
        d="M0,87 L0,100 L13,100"
        stroke="rgba(255, 0, 0, 0.5)"
        strokeWidth="5"
      />
      <path
        fill="none"
        d="M87,100 L100,100 L100,87"
        stroke="rgba(255, 0, 0, 0.5)"
        strokeWidth="5"
      />
      <path
        fill="none"
        d="M100,13 L100,0 87,0"
        stroke="rgba(255, 0, 0, 0.5)"
        strokeWidth="5"
      />
    </svg>
  </>
);

const QrReaderWrapper = ({ selectFacingMode, selectDelay, onAndOff }) => {
  const [facingMode, setFacingMode] = useState('user');
  const [delay, setDelay] = useState(500);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [on, setOn] = useState(true);

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
      {on && (
        <QrReader
          facingMode={facingMode}
          ViewFinder={ViewFinder}
          onResult={(result, error) => {
            if (result) {
              setData(result);
            }

            if (error !== 'NotFoundException') {
              setError(error);
            }
          }}
        />
      )}
      <p>El valor escaneado es: {JSON.stringify(data, null, 2)}</p>
      <p>El Error es: {JSON.stringify(error)}</p>
    </div>
  );
};

export const ChooseFacingMode = () => <QrReaderWrapper selectFacingMode />;

export const ChooseDelay = () => <QrReaderWrapper selectDelay />;

export const FacingModeNotSpecified = () => <QrReaderWrapper />;

export const OnAndOff = () => <QrReaderWrapper onAndOff />;
