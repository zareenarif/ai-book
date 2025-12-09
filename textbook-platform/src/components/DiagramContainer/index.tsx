import React, { useState } from 'react';

interface DiagramContainerProps {
  title?: string;
  children: React.ReactNode;
  zoomable?: boolean;
}

export default function DiagramContainer({
  title,
  children,
  zoomable = false,
}: DiagramContainerProps): JSX.Element {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="not-prose my-8 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      {title && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 m-0">
            {title}
          </h4>
        </div>
      )}
      <div
        className={`overflow-x-auto bg-white dark:bg-gray-900 p-6 ${
          zoomable ? 'cursor-zoom-in' : ''
        } ${isZoomed ? 'cursor-zoom-out' : ''}`}
        onClick={() => zoomable && setIsZoomed(!isZoomed)}
      >
        <div
          className={`transition-transform ${
            isZoomed ? 'scale-150 origin-center' : 'scale-100'
          }`}
        >
          {children}
        </div>
      </div>
      {zoomable && (
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 text-xs text-gray-600 dark:text-gray-400 text-center">
          Click to {isZoomed ? 'zoom out' : 'zoom in'}
        </div>
      )}
    </div>
  );
}
