import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tips';

export interface TipSubmission {
  text: string;
}

export interface StudyTip {
  _id: string;
  userName: string;
  createdAt: string;
  text: string;
  likes: number;
  course: string;
}

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(errorMessage);
  }
  throw new Error(defaultMessage);
};

const tipsService = {
  // Get all tips for a course
  getTips: async (courseId: string): Promise<StudyTip[]> => {
    try {
      const response = await axios.get(`${API_URL}/course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tips:', error);
      return handleError(error, 'Failed to fetch tips');
    }
  },

  // Add a new tip
  addTip: async (courseId: string, tip: TipSubmission): Promise<StudyTip> => {
    try {
      const response = await axios.post(
        `${API_URL}/course/${courseId}`,
        tip,
        { headers: authHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding tip:', error);
      return handleError(error, 'Failed to add tip');
    }
  },

  // Like/unlike a tip
  toggleLike: async (tipId: string): Promise<{ likes: number }> => {
    try {
      const response = await axios.post(
        `${API_URL}/${tipId}/like`,
        {},
        { headers: authHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error toggling like:', error);
      return handleError(error, 'Failed to update like');
    }
  },

  // Delete a tip (admin or owner only)
  deleteTip: async (tipId: string): Promise<void> => {
    try {
      await axios.delete(
        `${API_URL}/${tipId}`,
        { headers: authHeader() }
      );
    } catch (error) {
      console.error('Error deleting tip:', error);
      handleError(error, 'Failed to delete tip');
    }
  }
};

export default tipsService;

