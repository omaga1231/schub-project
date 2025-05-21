import React from 'react';

interface ErrorFallbackProps {
  error: Error | null;
  resetError?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  return (
    <div className="bg-surface rounded-lg shadow-md p-6 text-center">
      <svg 
        className="w-12 h-12 mx-auto text-danger mb-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <h2 className="text-xl font-semibold text-text-primary mb-2">
        Something went wrong
      </h2>
      <p className="text-text-secondary mb-4">
        {error?.message || 'An error occurred while loading this content.'}
      </p>
      {resetError && (
        <button
          onClick={resetError}
          className="btn-primary"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorFallback;

