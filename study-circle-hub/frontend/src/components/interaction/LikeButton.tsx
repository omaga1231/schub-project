import React from 'react';
import { useLikes } from '../../hooks/useLikes';

interface LikeButtonProps {
  itemId: string;
  itemType: 'tip' | 'review';
  initialCount: number;
  onLikeError?: (error: string) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  itemId,
  itemType,
  initialCount,
  onLikeError
}) => {
  const {
    likeCount,
    isLiked,
    isUpdating,
    toggleLike,
    connectToLikeUpdates
  } = useLikes({ initialCount, itemId, itemType });

  React.useEffect(() => {
    const cleanup = connectToLikeUpdates();
    return cleanup;
  }, [connectToLikeUpdates]);

  const handleClick = async () => {
    try {
      await toggleLike();
    } catch (error) {
      onLikeError?.(error instanceof Error ? error.message : 'Failed to update like');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isUpdating}
      className={`group flex items-center space-x-2 transition-all duration-200 ${
        isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
      }`}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      <svg
        className={`w-5 h-5 transform transition-transform duration-200 ${
          isLiked ? 'text-primary scale-110' : 'text-text-secondary group-hover:text-primary'
        } ${isUpdating ? 'animate-pulse' : ''}`}
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span
        className={`text-sm transition-colors duration-200 ${
          isLiked ? 'text-primary' : 'text-text-secondary group-hover:text-primary'
        }`}
      >
        {likeCount}
      </span>
    </button>
  );
};

export default LikeButton;

