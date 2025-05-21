import { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'users' | 'reviews'>('courses');
  
  // Mock data for admin dashboard
  const pendingReviews = [
    { id: 1, user: 'John Doe', course: 'Introduction to Computer Science', rating: 4, status: 'Pending' },
    { id: 2, user: 'Jane Smith', course: 'Calculus I', rating: 3, status: 'Pending' },
    { id: 3, user: 'Alex Johnson', course: 'Introduction to Psychology', rating: 5, status: 'Pending' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', registeredDate: '2025-04-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', registeredDate: '2025-04-16' },
    { id: 3, name: 'Alex Johnson', email: 'alex@example.com', registeredDate: '2025-04-17' },
  ];

  const popularCourses = [
    { id: 1, name: 'Introduction to Computer Science', reviews: 28, avgRating: 4.5 },
    { id: 2, name: 'Calculus I', reviews: 22, avgRating: 4.2 },
    { id: 3, name: 'Introduction to Psychology', reviews: 35, avgRating: 4.8 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 font-medium ${activeTab === 'courses' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}
        >
          Courses
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-medium ${activeTab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary' : 'text-text-secondary'}`}
        >
          Reviews
        </button>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'courses' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Popular Courses</h2>
            <button className="btn-primary">Add New Course</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border text-left">Course Name</th>
                  <th className="py-2 px-4 border text-left">Reviews</th>
                  <th className="py-2 px-4 border text-left">Avg. Rating</th>
                  <th className="py-2 px-4 border text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {popularCourses.map(course => (
                  <tr key={course.id}>
                    <td className="py-2 px-4 border">{course.name}</td>
                    <td className="py-2 px-4 border">{course.reviews}</td>
                    <td className="py-2 px-4 border">{course.avgRating.toFixed(1)}</td>
                    <td className="py-2 px-4 border">
                      <button className="text-primary mr-2">Edit</button>
                      <button className="text-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'users' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Users</h2>
            <button className="btn-primary">Add New User</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border text-left">Name</th>
                  <th className="py-2 px-4 border text-left">Email</th>
                  <th className="py-2 px-4 border text-left">Registered Date</th>
                  <th className="py-2 px-4 border text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map(user => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border">{user.name}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">{user.registeredDate}</td>
                    <td className="py-2 px-4 border">
                      <button className="text-primary mr-2">Edit</button>
                      <button className="text-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'reviews' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Pending Reviews</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border text-left">User</th>
                  <th className="py-2 px-4 border text-left">Course</th>
                  <th className="py-2 px-4 border text-left">Rating</th>
                  <th className="py-2 px-4 border text-left">Status</th>
                  <th className="py-2 px-4 border text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingReviews.map(review => (
                  <tr key={review.id}>
                    <td className="py-2 px-4 border">{review.user}</td>
                    <td className="py-2 px-4 border">{review.course}</td>
                    <td className="py-2 px-4 border">{review.rating}</td>
                    <td className="py-2 px-4 border">{review.status}</td>
                    <td className="py-2 px-4 border">
                      <button className="text-primary mr-2">Approve</button>
                      <button className="text-danger">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
