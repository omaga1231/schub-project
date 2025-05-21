import axios from 'axios';

export interface SearchResult {
  id: string;
  name: string;
  code: string;
  professor: string;
  college: string;
  rating: number;
}

const handleError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(errorMessage);
  }
  throw new Error(defaultMessage);
};

const searchService = {
  searchCourses: async (query: string): Promise<SearchResult[]> => {
    try {
      if (!query.trim()) return [];
      
      const response = await axios.get(`/api/courses/search`, {
        params: { q: query },
        timeout: 5000 // 5 second timeout
      });
      
      return response.data;
    } catch (error) {
      return handleError(error, 'Failed to search courses');
    }
  },

  getSearchSuggestions: async (query: string): Promise<string[]> => {
    try {
      if (!query.trim()) return [];
      
      const response = await axios.get(`/api/courses/suggestions`, {
        params: { q: query },
        timeout: 3000 // 3 second timeout
      });
      
      return response.data;
    } catch (error) {
      return handleError(error, 'Failed to get search suggestions');
    }
  }
};

export default searchService;

