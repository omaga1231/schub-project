import { Link } from 'react-router-dom';

const HomePage = () => {
  const featuredCourses = [
    { id: 1, name: 'Introduction to Computer Science', college: 'Tech University', rating: 4.5 },
    { id: 2, name: 'Calculus I', college: 'Science Academy', rating: 4.2 },
    { id: 3, name: 'Introduction to Psychology', college: 'Liberal Arts College', rating: 4.8 },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-primary rounded-xl text-white p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Perfect Course</h1>
          <p className="text-lg md:text-xl mb-8">Get reviews, study tips, and resources from fellow students.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/courses" className="bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Browse Courses
            </Link>
            <Link to="/register" className="bg-primary-dark text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="card p-6">
        <h2 className="text-2xl font-bold mb-4">Search Courses</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search by course name or code..." 
            className="border border-gray-300 rounded-md px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="btn-primary">Search</button>
        </div>
      </section>

      {/* Featured Courses */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map(course => (
            <div key={course.id} className="card hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
              <p className="text-text-secondary mb-2">{course.college}</p>
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
                <span className="ml-2 text-text-secondary">{course.rating.toFixed(1)}</span>
              </div>
              <div className="mt-4">
                <Link to={`/courses/${course.id}`} className="text-primary hover:text-primary-dark font-medium">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/courses" className="btn-primary">
            View All Courses
          </Link>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-text-primary text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Help other students succeed by sharing your course reviews, study tips, and resources.
        </p>
        <Link to="/register" className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-dark transition-colors">
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
