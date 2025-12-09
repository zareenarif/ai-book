import React, { useState } from 'react';
import Link from '@docusaurus/Link';

interface GlossaryTermProps {
  term: string;
  definition: string;
  href?: string;
}

export default function GlossaryTerm({
  term,
  definition,
  href,
}: GlossaryTermProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="border-b-2 border-dotted border-primary-500 cursor-help text-primary-600 dark:text-primary-400 font-semibold">
        {term}
      </span>

      {isHovered && (
        <span
          className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl"
          role="tooltip"
        >
          <span className="block">{definition}</span>
          {href && (
            <span className="block mt-2 text-primary-300 text-xs">
              Click to learn more →
            </span>
          )}
          {/* Tooltip arrow */}
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
            <span className="block w-3 h-3 bg-gray-900 transform rotate-45"></span>
          </span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link to={href} className="no-underline hover:no-underline">
        {content}
      </Link>
    );
  }

  return content;
}
