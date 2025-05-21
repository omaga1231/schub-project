import { useState, useCallback } from 'react';
import { Socket, io } from 'socket.io-client';

interface UseLikesProps {
  initialCount: number;
  itemId: string;
  itemType: 'tip' | 'review';
}

export const useLikes = ({ initialCount, itemId, itemType }: UseLikesProps) => {
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Initialize socket connection
  const socket = io('http://localhost:5000', {
    autoConnect: false
  });

  // Connect to real-time updates
  const connectToLikeUpdates = useCallback(() => {
    socket.connect();
    socket.on(`${itemType}:like`, (data: { id: string; likes: number }) => {
      if (data.id === itemId) {
        setLikeCount(data.likes);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [itemId, itemType]);

  // Toggle like
  const toggleLike = async () => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/${itemType}s/${itemId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth header if needed
        }
      });

      if (!response.ok) throw new Error('Failed to update like');

      const data = await response.json();
      setLikeCount(data.likes);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error updating like:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    likeCount,
    isLiked,
    isUpdating,
    toggleLike,
    connectToLikeUpdates
  };
};

