import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  rosVersion?: string;
  title?: string;
}

export default function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  rosVersion,
  title,
}: CodeBlockProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose my-6">
      {(title || rosVersion) && (
        <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-t-lg border-b border-gray-700">
          {title && <span className="font-mono text-sm">{title}</span>}
          {rosVersion && (
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded font-semibold">
              ROS 2 {rosVersion}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} p-4 overflow-x-auto rounded-lg ${
                title || rosVersion ? 'rounded-t-none' : ''
              }`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {showLineNumbers && (
                    <span className="inline-block w-8 text-gray-500 select-none text-right mr-4">
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
          aria-label="Copy code"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
