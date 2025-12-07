import React from 'react';
import OriginalLayout from '@theme-original/Layout';

export default function Layout(props) {
  return (
    <div className="font-sans">
      <OriginalLayout {...props} />
    </div>
  );
}
