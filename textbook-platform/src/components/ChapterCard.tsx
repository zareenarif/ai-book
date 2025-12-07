import React from 'react';
import Link from '@docusaurus/Link';

interface ChapterCardProps {
  title: string;
  description: string;
  moduleNumber: number;
  lessonCount: number;
  href: string;
  topics?: string[];
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  title,
  description,
  moduleNumber,
  lessonCount,
  href,
  topics = [],
}) => {
  return (
    <Link
      to={href}
      className="chapter-card block no-underline hover:no-underline"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-primary-500 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
            {moduleNumber}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            {description}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              {lessonCount} Lessons
            </span>
          </div>
          {topics && topics.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChapterCard;
