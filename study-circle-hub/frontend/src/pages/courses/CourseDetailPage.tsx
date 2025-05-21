import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import reviewsService, { ReviewSubmission } from '../../services/reviewsService';
import authService from '../../services/authService';
import Loading from '../../components/ui/Loading';
import Alert from '../../components/ui/Alert';
import LikeButton from '../../components/interaction/LikeButton';
import ConfirmationModal from '../../components/interaction/ConfirmationModal';

interface Review {
  _id: string;
  userName: string;
  createdAt: string;
  rating: number;
  text: string;
}

interface StudyTip {
  id: number;
  userName: string;
  date: string;
  text: string;
  likes: number;
}

interface Resource {
  id: number;
  title: string;
  type: 'pdf' | 'link' | 'image';
  url: string;
  uploadedBy: string;
  date: string;
}

interface Course {
  id: number;
  name: string;
  code: string;
  college: string;
  professor: string;
  difficulty: string;
  description: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  tips: StudyTip[];
  resources: Resource[];
}

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'reviews' | 'tips' | 'resources'>('reviews');
  const [activeTab, setActiveTab] = useState<'reviews' | 'tips' | 'resources'>('reviews');
  const [newReview, setNewReview] = useState<ReviewSubmission>({ rating: 0, text: '' });
  const [newTip, setNewTip] = useState({ text: '' });
  const [showTipConfirmation, setShowTipConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingTip, setIsSubmittingTip] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [user] = useState(authService.getCurrentUser());
  
  const [course, setCourse] = useState<Course>({
    id: parseInt(courseId || '1'),
    name: 'Introduction to Computer Science',
    code: 'CS101',
    college: 'Tech University',
    professor: 'Dr. Smith',
    difficulty: 'Beginner',
    description: 'An introduction to the fundamentals of computer science including algorithms, data structures, hardware, and software design principles.',
    rating: 4.5,
    reviewCount: 28,
    reviews: [],
    tips: [
      { id: 1, userName: 'Chris Lee', date: '2024-03-10', text: 'Start the assignments early. They take longer than you think!', likes: 0 },
      { id: 2, userName: 'Jordan Patel', date: '2024-02-05', text: 'Form a study group for the exams. It helps to discuss the concepts together.', likes: 0 },
      { id: 3, userName: 'Casey Wong', date: '2024-01-18', text: 'The textbook has great additional examples that aren\'t covered in class.', likes: 0 },
    ],
    resources: [
      { id: 1, title: 'Course Syllabus', type: 'pdf', url: '/resources/syllabus.pdf', uploadedBy: 'Admin', date: '2024-01-01' },
      { id: 2, title: 'Algorithms Cheat Sheet', type: 'pdf', url: '/resources/algorithms.pdf', uploadedBy: 'Alex Johnson', date: '2024-02-15' },
      { id: 3, title: 'Practice Exercises', type: 'link', url: 'https://example.com/practice', uploadedBy: 'Jamie Smith', date: '2024-03-01' },
    ]
  });
  
  // Fetch reviews when component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const reviews = await reviewsService.getReviews(courseId || '1');
        setCourse(prev => ({ ...prev, reviews }));
      } catch (err) {
        setError('Failed to fetch reviews');
        console.error('Error fetching reviews:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [courseId]);
  
  // Handle review submission
  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please log in to submit a review');
      return;
    }
    
    if (!newReview.rating) {
      setError('Please select a rating');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      const addedReview = await reviewsService.addReview(courseId || '1', newReview);
      
      setCourse(prev => ({
        ...prev,
        reviews: [addedReview, ...prev.reviews],
        reviewCount: prev.reviewCount + 1,
        rating: (prev.rating * prev.reviewCount + addedReview.rating) / (prev.reviewCount + 1)
      }));
      
      setNewReview({ rating: 0, text: '' });
      setSuccessMessage('Review submitted successfully');
      setTimeout(() => {
          setSuccessMessage(null);
          navigate(`/courses/${courseId}`);
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to submit review');
      }
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTipSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please log in to share a study tip');
      return;
    }
    
    try {
      setIsSubmittingTip(true);
      // TODO: Add actual tip submission logic
      
      setNewTip({ text: '' });
      setSuccessMessage('Study tip shared successfully');
      setTimeout(() => {
          setSuccessMessage(null);
          navigate(`/courses/${courseId}`);
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
      }, 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to share study tip');
      }
      console.error('Error submitting study tip:', err);
    } finally {
      setIsSubmittingTip(false);
    }
  };


  const onLikeError = (errorMessage: string) => {
      setError(errorMessage);
      setTimeout(() => setError(null), 3000);
  }

  return (
    <div>
      {/* Course Header */}
      <div className="bg-surface rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
            <p className="text-text-secondary mb-2">Code: {course.code}</p>
            <p className="text-text-secondary mb-2">Professor: {course.professor}</p>
            <p className="text-text-secondary mb-2">College: {course.college}</p>
            <p className="text-text-secondary mb-4">Difficulty: {course.difficulty}</p>
            <div className="flex items-center">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(course.rating) ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </span>
                ))}
              </div>
              <span className="ml-2 text-text-secondary">{course.rating.toFixed(1)} ({course.reviewCount} reviews)</span>
            </div>
          </div>
          <Link to="/courses" className="text-primary hover:text-primary-dark">
            Back to All Courses
          </Link>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p>{course.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}
        >
          Reviews
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`px-4 py-2 font-medium ${activeTab === 'tips' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}
        >
          Study Tips
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 font-medium ${activeTab === 'resources' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}
        >
          Resources
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'reviews' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          
          {error && (
            <Alert type="error" message={error} onClose={() => setError(null)} />
          )}
          
          {successMessage && (
            <Alert type="success" message={successMessage} onClose={() => setSuccessMessage(null)} />
          )}
          
          {isLoading ? (
            <div className="my-8 flex justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <>
              <div className="mb-6">
                {!user ? (
                  <div className="bg-surface rounded-lg shadow-md p-4 text-center">
                    <p className="text-text-secondary mb-4">Please log in to leave a review</p>
                    <Link to="/login" className="btn-primary">
                      Log In
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="bg-surface rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
                    <div className="mb-4">
                      <label className="block mb-2 font-medium">Rating</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              newReview.rating >= rating ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'
                            } transition-colors duration-200 hover:scale-110`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 font-medium">Your Review</label>
                      <textarea
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                        value={newReview.text}
                        onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className={`btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                )}
              </div>
              <div className="space-y-4">
                {course.reviews.map(review => (
                  <div key={review._id} className="bg-surface rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">{review.userName}</div>
                      <div className="text-text-secondary text-sm">{new Date(review.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="flex text-yellow-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < review.rating ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          )}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2">{review.text}</p>
                  </div>
                ))}
                {course.reviews.length === 0 && (
                  <p className="text-text-secondary text-center py-8">No reviews yet. Be the first to review this course!</p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Study Tips Tab */}
      {activeTab === 'tips' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Study Tips</h2>
          
          {error && (
            <Alert type="error" message={error} onClose={() => setError(null)} />
          )}
          
          {successMessage && (
            <Alert type="success" message={successMessage} onClose={() => setSuccessMessage(null)} />
          )}

           {/* Confirmation Modals */}
            <ConfirmationModal
                isOpen={showTipConfirmation}
                onClose={() => setShowTipConfirmation(false)}
                onConfirm={confirmTipSubmit}
                title="Confirm Tip Submission"
                message="Are you sure you want to submit this tip?"
                confirmText="Submit"
                cancelText="Cancel"
                type="info"
            />

          {/* Resources Tab */}
              <div className="bg-surface rounded-lg shadow-md p-4 text-center">
                <p className="text-text-secondary mb-4">Please log in to share study tips</p>
                <Link to="/login" className="btn-primary">Log In</Link>
              </div>
            ) : (
              <form onSubmit={handleTipSubmit} className="bg-surface rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-4">Share a Study Tip</h3>
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Your Tip</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                    value={newTip.text}
                    onChange={(e) => setNewTip(prev => ({ ...prev, text: e.target.value }))}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className={`btn-primary ${isSubmittingTip ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmittingTip}
                >
                  {isSubmittingTip ? 'Submitting...' : 'Submit Tip'}
                </button>
              </form>
            )}
          </div>
          <div className="space-y-4">
            {course.tips.map(tip => (
              <div key={tip.id} className="bg-surface rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">{tip.userName}</div>
                  <div className="text-text-secondary text-sm">{tip.date}</div>
                </div>
                <p className="mb-3">{tip.text}</p>
                 <LikeButton itemId={tip.id} itemType="tip" initialCount={tip.likes} onLikeError={onLikeError} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Resources</h2>
          
          {error && (
            <Alert type="error" message={error} onClose={() => setError(null)} />
          )}
          
          {successMessage && (
            <Alert type="success" message={successMessage} onClose={() => setSuccessMessage(null)} />
          )}
          
          {!user ? (
            <div className="bg-surface rounded-lg shadow-md p-4 text-center mb-6">
              <p className="text-text-secondary mb-4">Please log in to upload resources</p>
              <Link to="/login" className="btn-primary">Log In</Link>
            </div>
          ) : (
            <div className="bg-surface rounded-lg shadow-md p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Upload a Resource</h3>
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-8">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mt-1 text-sm text-text-secondary">
                    Drag and drop files here, or 
                    <button className="text-primary hover:text-primary-dark ml-1">browse</button>
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">PDF, Word, Images, or Links</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-4">
            {course.resources.map(resource => (
              <div key={resource.id} className="bg-surface rounded-lg shadow-md p-4 flex items-center">
                <div className="mr-4 bg-primary bg-opacity-10 p-3 rounded-full">
                  {resource.type === 'pdf' && (
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  )}
                  {resource.type === 'link' && (
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  )}
                  {resource.type === 'image' && (
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">{resource.title}</h4>
                  <div className="flex items-center text-text-secondary text-sm mt-1">
                    <span>Uploaded by {resource.uploadedBy} • {resource.date}</span>
                  </div>
                </div>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;

