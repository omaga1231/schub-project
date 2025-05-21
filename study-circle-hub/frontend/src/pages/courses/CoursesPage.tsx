import { useState } from 'react';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
  // Mock data for courses
  const allCourses = [
    { id: 1, name: 'Introduction to Computer Science', code: 'CS101', college: 'Tech University', professor: 'Dr. Smith', difficulty: 'Beginner', rating: 4.5 },
    { id: 2, name: 'Calculus I', code: 'MATH101', college: 'Science Academy', professor: 'Dr. Johnson', difficulty: 'Intermediate', rating: 4.2 },
    { id: 3, name: 'Introduction to Psychology', code: 'PSYCH101', college: 'Liberal Arts College', professor: 'Dr. Williams', difficulty: 'Beginner', rating: 4.8 },
    { id: 4, name: 'Data Structures & Algorithms', code: 'CS201', college: 'Tech University', professor: 'Dr. Garcia', difficulty: 'Advanced', rating: 3.9 },
    { id: 5, name: 'Organic Chemistry', code: 'CHEM201', college: 'Science Academy', professor: 'Dr. Miller', difficulty: 'Advanced', rating: 3.5 },
    { id: 6, name: 'World History', code: 'HIST101', college: 'Liberal Arts College', professor: 'Dr. Davis', difficulty: 'Intermediate', rating: 4.4 },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    college: '',
    professor: '',
    difficulty: '',
  });

  // Filter courses based on search term and filters
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCollege = !filters.college || course.college === filters.college;
    const matchesProfessor = !filters.professor || course.professor === filters.professor;
    const matchesDifficulty = !filters.difficulty || course.difficulty === filters.difficulty;
    
    return matchesSearch && matchesCollege && matchesProfessor && matchesDifficulty;
  });

  // Get unique values for filter dropdowns
  const colleges = allCourses
    .map(course => course.college)
    .filter((value, index, self) => self.indexOf(value) === index);
    
  const professors = allCourses
    .map(course => course.professor)
    .filter((value, index, self) => self.indexOf(value) === index);
    
  const difficulties = allCourses
    .map(course => course.difficulty)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Course Catalog</h1>
      
      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="mb-4">
          <label htmlFor="search" className="block mb-1 font-medium">
            Search Courses
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by course name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="college" className="block mb-1 font-medium">
              College
            </label>
            <select
              id="college"
              value={filters.college}
              onChange={(e) => setFilters({...filters, college: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Colleges</option>
              {colleges.map(college => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="professor" className="block mb-1 font-medium">
              Professor
            </label>
            <select
              id="professor"
              value={filters.professor}
              onChange={(e) => setFilters({...filters, professor: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Professors</option>
              {professors.map(professor => (
                <option key={professor} value={professor}>{professor}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className="block mb-1 font-medium">
              Difficulty
            </label>
            <select
              id="difficulty"
              value={filters.difficulty}
              onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Difficulties</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <span className="text-sm bg-text-primary text-white px-2 py-1 rounded-full">
                  {course.code}
                </span>
              </div>
              <p className="text-text-secondary mb-1">College: {course.college}</p>
              <p className="text-text-secondary mb-1">Professor: {course.professor}</p>
              <p className="text-text-secondary mb-3">Difficulty: {course.difficulty}</p>
              <div className="flex items-center mb-4">
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
              <Link to={`/courses/${course.id}`} className="btn-primary block text-center">
                View Course
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-8">
            <p className="text-text-secondary text-lg">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
