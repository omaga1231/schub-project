import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resources';

export interface ResourceSubmission {
  title: string;
  type: 'pdf' | 'link' | 'image';
  url?: string;
  file?: File;
}

export interface Resource {
  _id: string;
  title: string;
  type: 'pdf' | 'link' | 'image';
  url: string;
  uploadedBy: string;
  createdAt: string;
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

const resourcesService = {
  // Get all resources for a course
  getResources: async (courseId: string): Promise<Resource[]> => {
    try {
      const response = await axios.get(`${API_URL}/course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      return handleError(error, 'Failed to fetch resources');
    }
  },

  // Add a new resource
  addResource: async (courseId: string, resource: ResourceSubmission): Promise<Resource> => {
    try {
      let formData = new FormData();
      formData.append('title', resource.title);
      formData.append('type', resource.type);
      
      if (resource.file) {
        formData.append('file', resource.file);
      } else if (resource.url) {
        formData.append('url', resource.url);
      }

      const response = await axios.post(
        `${API_URL}/course/${courseId}`,
        formData,
        {
          headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding resource:', error);
      return handleError(error, 'Failed to add resource');
    }
  },

  // Delete a resource (admin or owner only)
  deleteResource: async (resourceId: string): Promise<void> => {
    try {
      await axios.delete(
        `${API_URL}/${resourceId}`,
        { headers: authHeader() }
      );
    } catch (error) {
      console.error('Error deleting resource:', error);
      handleError(error, 'Failed to delete resource');
    }
  }
};

export default resourcesService;

