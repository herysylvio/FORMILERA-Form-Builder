import React from 'react';

export function Tooltip({
  children,
  label,
  shortcut,
  className = ''
}: {
  children: React.ReactNode;
  label: string;
  shortcut?: string;
  className?: string;
}) {
  return (
    <div className={`relative group inline-flex ${className}`} title={shortcut ? `${label} (${shortcut})` : label}>
      {children}
    </div>
  );
}
