import React from 'react';
import Link from '@docusaurus/Link';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface LessonLayoutProps {
  children: React.ReactNode;
  toc?: TocItem[];
  previousLesson?: { title: string; href: string };
  nextLesson?: { title: string; href: string };
}

export default function LessonLayout({
  children,
  toc = [],
  previousLesson,
  nextLesson,
}: LessonLayoutProps): JSX.Element {
  return (
    <div className="lesson-layout grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main content area */}
      <div className="lg:col-span-3">
        <article className="prose dark:prose-invert max-w-none">
          {children}
        </article>

        {/* Previous/Next navigation */}
        <nav className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
          {previousLesson ? (
            <Link
              to={previousLesson.href}
              className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 no-underline group"
            >
              <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Previous</div>
                <div className="font-semibold">{previousLesson.title}</div>
              </div>
            </Link>
          ) : (
            <div></div>
          )}

          {nextLesson && (
            <Link
              to={nextLesson.href}
              className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 no-underline text-right group"
            >
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Next</div>
                <div className="font-semibold">{nextLesson.title}</div>
              </div>
              <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          )}
        </nav>
      </div>

      {/* Sticky Table of Contents */}
      {toc.length > 0 && (
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-3">
              On This Page
            </h3>
            <ul className="space-y-2 text-sm border-l-2 border-gray-200 dark:border-gray-700">
              {toc.map((item) => (
                <li
                  key={item.id}
                  style={{ paddingLeft: `${(item.level - 2) * 12 + 12}px` }}
                >
                  <a
                    href={`#${item.id}`}
                    className="block py-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-l-2 hover:border-primary-500 hover:-ml-0.5 transition-colors no-underline"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}
