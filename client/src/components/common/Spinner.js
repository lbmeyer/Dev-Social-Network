import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: '128px', margin: 'auto', display: 'block', height: '120px' }}
      />
    </div>
  );
};
