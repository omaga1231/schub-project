import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api/reviews';

export interface ReviewSubmission {
  rating: number;
  text: string;
}

export interface Review {
  _id: string;
  userName: string;
  createdAt: string;
  rating: number;
  text: string;
}

// Add auth header to requests if token exists
const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string }>;
    const errorMessage = axiosError.response?.data?.message || axiosError.message;
    throw new Error(errorMessage);
  }
  throw new Error(defaultMessage);
};

const reviewsService = {
  // Get all reviews for a course
  getReviews: async (courseId: string): Promise<Review[]> => {
    try {
      const response = await axios.get(`${API_URL}/course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return handleError(error, 'Failed to fetch reviews');
    }
  },

  // Add a new review
  addReview: async (courseId: string, review: ReviewSubmission): Promise<Review> => {
    try {
      const response = await axios.post(
        `${API_URL}/course/${courseId}`,
        review,
        { headers: authHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      return handleError(error, 'Failed to add review');
    }
  },

  // Delete a review
  deleteReview: async (reviewId: string): Promise<void> => {
    try {
      await axios.delete(
        `${API_URL}/${reviewId}`,
        { headers: authHeader() }
      );
    } catch (error) {
      console.error('Error deleting review:', error);
      handleError(error, 'Failed to delete review');
    }
  }
};

export default reviewsService;
