import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  moduleNumber?: number;
  weekNumber?: number;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  moduleNumber,
  weekNumber
}) => {
  return (
    <header className="lesson-header">
      <div className="flex flex-col space-y-2">
        {(moduleNumber || weekNumber) && (
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            {moduleNumber && (
              <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full font-semibold">
                Module {moduleNumber}
              </span>
            )}
            {weekNumber && (
              <span className="bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 px-3 py-1 rounded-full font-semibold">
                Week {weekNumber}
              </span>
            )}
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
