import React, { useState } from 'react';

interface ExerciseSectionProps {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  hints?: string[];
  expectedOutcome: string;
  defaultExpanded?: boolean;
}

export default function ExerciseSection({
  title,
  difficulty,
  description,
  hints,
  expectedOutcome,
  defaultExpanded = false,
}: ExerciseSectionProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showHints, setShowHints] = useState(false);

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <div className="not-prose my-6 border-2 border-primary-300 dark:border-primary-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-primary-50 dark:bg-primary-900 px-4 py-3 flex items-center justify-between hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{isExpanded ? '📖' : '📝'}</span>
          <h3 className="font-bold text-lg m-0 text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <span className={`text-xs px-2 py-1 rounded font-semibold ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
        <span className="text-2xl text-gray-600 dark:text-gray-400">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {isExpanded && (
        <div className="bg-white dark:bg-gray-900 p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Description</h4>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
          </div>

          {hints && hints.length > 0 && (
            <div>
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-primary-600 dark:text-primary-400 hover:underline font-semibold text-sm"
              >
                {showHints ? '▼' : '▶'} {showHints ? 'Hide' : 'Show'} Hints ({hints.length})
              </button>
              {showHints && (
                <ul className="mt-2 space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  {hints.map((hint, index) => (
                    <li key={index} className="text-sm">
                      {hint}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="bg-secondary-50 dark:bg-secondary-900 p-4 rounded-lg border-l-4 border-secondary-500">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Expected Outcome
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{expectedOutcome}</p>
          </div>
        </div>
      )}
    </div>
  );
}
