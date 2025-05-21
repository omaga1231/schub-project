import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'dots' | 'shimmer';
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  variant = 'spinner',
  text,
  fullScreen = false,
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-50'
    : 'flex items-center justify-center';

  const renderLoadingIndicator = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${sizeClasses[size]} bg-primary rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        );
      
      case 'shimmer':
        return (
          <div 
            className={`${sizeClasses[size]} bg-shimmer bg-[length:1000px_100%] animate-shimmer rounded`}
          />
        );
      
      default: // spinner
        return (
          <div 
            className={`${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full animate-spin`}
          />
        );
    }
  };

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-3">
        {renderLoadingIndicator()}
        {text && (
          <p className={`${textSizeClasses[size]} text-text-secondary animate-pulse`}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

// Convenience components for common use cases
export const LoadingOverlay: React.FC<{ text?: string }> = ({ text }) => (
  <Loading variant="spinner" size="large" fullScreen text={text} />
);

export const LoadingDots: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'small' }) => (
  <Loading variant="dots" size={size} />
);

export const LoadingShimmer: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-shimmer bg-[length:1000px_100%] animate-shimmer rounded ${className}`} />
);

export default Loading;

