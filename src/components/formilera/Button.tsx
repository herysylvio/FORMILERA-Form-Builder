import React from 'react';

export function Button({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-medium transition-colors focus:outline-none ${className}`}
      {...props}>
      {children}
    </button>
  );
}
