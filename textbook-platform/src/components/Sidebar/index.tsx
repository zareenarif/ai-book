import React, { useState } from 'react';
import Link from '@docusaurus/Link';

export interface SidebarItem {
  type: 'link' | 'category';
  label: string;
  href?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  currentPath: string;
}

function SidebarCategory({
  item,
  currentPath,
  level = 0,
}: {
  item: SidebarItem;
  currentPath: string;
  level?: number;
}) {
  const [isCollapsed, setIsCollapsed] = useState(item.collapsed ?? false);

  // Check if any child is active
  const hasActiveChild = (items: SidebarItem[]): boolean => {
    return items.some(
      (child) =>
        child.href === currentPath ||
        (child.items && hasActiveChild(child.items))
    );
  };

  const isActive = hasActiveChild(item.items || []);

  return (
    <li className="mb-1">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded text-left font-semibold transition-colors ${
          isActive
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        aria-expanded={!isCollapsed}
      >
        <span>{item.label}</span>
        <span className="text-sm">{isCollapsed ? '▶' : '▼'}</span>
      </button>
      {!isCollapsed && item.items && (
        <ul className="mt-1 space-y-1">
          {item.items.map((child, index) => (
            <SidebarItemRenderer
              key={index}
              item={child}
              currentPath={currentPath}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function SidebarLink({
  item,
  currentPath,
  level = 0,
}: {
  item: SidebarItem;
  currentPath: string;
  level?: number;
}) {
  const isActive = item.href === currentPath;

  return (
    <li>
      <Link
        to={item.href!}
        className={`block px-3 py-2 rounded transition-colors no-underline ${
          isActive
            ? 'bg-primary-600 text-white font-semibold'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
      >
        {item.label}
      </Link>
    </li>
  );
}

function SidebarItemRenderer({
  item,
  currentPath,
  level = 0,
}: {
  item: SidebarItem;
  currentPath: string;
  level?: number;
}) {
  if (item.type === 'category') {
    return <SidebarCategory item={item} currentPath={currentPath} level={level} />;
  }
  return <SidebarLink item={item} currentPath={currentPath} level={level} />;
}

export default function Sidebar({ items, currentPath }: SidebarProps): JSX.Element {
  return (
    <nav className="sidebar bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto p-4">
      <ul className="space-y-1">
        {items.map((item, index) => (
          <SidebarItemRenderer key={index} item={item} currentPath={currentPath} />
        ))}
      </ul>
    </nav>
  );
}
