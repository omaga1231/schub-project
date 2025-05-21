#!/bin/bash

# Setup script for Study Circle Hub platform
# This script automates the complete setup process including:
# - Project structure creation
# - Frontend (React) setup
# - Backend (Express + Node.js) setup
# - Configuration files
# - Boilerplate code

# Function to display colored output for better readability
print_message() {
  local color=$1
  local message=$2
  
  case $color in
    "green") echo -e "\e[32m$message\e[0m" ;;
    "red") echo -e "\e[31m$message\e[0m" ;;
    "yellow") echo -e "\e[33m$message\e[0m" ;;
    "blue") echo -e "\e[34m$message\e[0m" ;;
    *) echo "$message" ;;
  esac
}

# Function to check if command was successful
check_error() {
  if [ $? -ne 0 ]; then
    print_message "red" "ERROR: $1"
    exit 1
  fi
}

# Function to create directory if it doesn't exist
create_directory() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
    check_error "Failed to create directory: $1"
    print_message "green" "Created directory: $1"
  else
    print_message "yellow" "Directory already exists: $1"
  fi
}

# Welcome message
clear
print_message "blue" "====================================================="
print_message "blue" "    STUDY CIRCLE HUB - AUTOMATED SETUP SCRIPT"
print_message "blue" "====================================================="
print_message "green" "This script will set up the complete Study Circle Hub platform including:"
print_message "green" " - Frontend (React + Tailwind CSS)"
print_message "green" " - Backend (Node.js + Express)"
print_message "green" " - Project structure"
print_message "green" " - Configuration files"
print_message "green" " - Boilerplate code"
echo ""
print_message "yellow" "The process may take a few minutes to complete..."
echo ""

# Base project directory
PROJECT_ROOT="study-circle-hub"
create_directory "$PROJECT_ROOT"
cd "$PROJECT_ROOT" || { print_message "red" "Failed to enter project directory"; exit 1; }

# Initialize Git repository
print_message "blue" "Initializing Git repository..."
git init
check_error "Failed to initialize Git repository"

# Create .gitignore file
cat > .gitignore << 'EOL'
# dependencies
node_modules/
.pnp/
.pnp.js

# testing
coverage/

# production
build/
dist/

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
EOL
check_error "Failed to create .gitignore file"
print_message "green" "Created .gitignore file"

# Create README.md
cat > README.md << 'EOL'
# Study Circle Hub

A platform for college students to review and share course experiences, study tips, and preparation resources.

## Features

- Course catalog with filtering by subject, professor, difficulty, and college
- Course pages with reviews, ratings, study tips, and resource uploads
- User authentication 
- Type-ahead search
- Admin panel for content moderation
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, Tailwind CSS, ShadCN/UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Frontend Setup

```
cd frontend
npm install
npm start
```

### Backend Setup

```
cd backend
npm install
npm start
```

## Environment Variables

Create a `.env` file in the backend directory with:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Development

- Frontend runs on http://localhost:3000
- Backend API runs on http://localhost:5000

## Deployment

- Frontend: Deploy to Vercel
- Backend: Deploy to Render or Railway
EOL
check_error "Failed to create README.md file"
print_message "green" "Created README.md file"

# Create frontend directory
print_message "blue" "Setting up frontend..."
create_directory "frontend"
cd frontend || { print_message "red" "Failed to enter frontend directory"; exit 1; }

# Initialize React app
print_message "yellow" "Initializing React app (this may take a while)..."
npx create-react-app . --template typescript
check_error "Failed to create React app"
print_message "green" "React app initialized successfully"

# Install additional frontend dependencies
print_message "yellow" "Installing frontend dependencies..."
npm install react-router-dom axios tailwindcss postcss autoprefixer @headlessui/react @heroicons/react
check_error "Failed to install frontend dependencies"
print_message "green" "Frontend dependencies installed successfully"

# Setup Tailwind CSS
print_message "yellow" "Setting up Tailwind CSS..."
npx tailwindcss init -p
check_error "Failed to initialize Tailwind CSS"

# Configure Tailwind with custom color palette
cat > tailwind.config.js << 'EOL'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Emerald
          dark: '#047857', // Dark Accent
        },
        background: '#F3F4F6', // Soft gray
        text: {
          primary: '#111827',
          secondary: '#6B7280',
        },
        surface: '#FFFFFF', // Cards and content areas
        danger: '#F43F5E', // Error
        info: '#0EA5E9', // Info
      },
    },
  },
  plugins: [],
}
EOL
check_error "Failed to configure Tailwind CSS"
print_message "green" "Tailwind CSS configured successfully"

# Update index.css for Tailwind
cat > src/index.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #F3F4F6;
  color: #111827;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@layer components {
  .btn-primary {
    @apply bg-primary px-4 py-2 text-white rounded-md hover:bg-primary-dark transition-colors;
  }
  .card {
    @apply bg-surface p-4 rounded-lg shadow-md;
  }
}
EOL
check_error "Failed to update index.css"
print_message "green" "Updated index.css for Tailwind"

# Create necessary directories for frontend structure
print_message "yellow" "Creating frontend directory structure..."
create_directory "src/components"
create_directory "src/components/ui"
create_directory "src/components/layout"
create_directory "src/pages"
create_directory "src/pages/auth"
create_directory "src/pages/courses"
create_directory "src/pages/admin"
create_directory "src/routes"
create_directory "src/assets"
create_directory "src/hooks"
create_directory "src/utils"
create_directory "src/services"
create_directory "src/context"

# Create basic components
print_message "yellow" "Creating basic components..."

# App.tsx with router
cat > src/App.tsx << 'EOL'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/courses/CoursesPage';
import CourseDetailPage from './pages/courses/CourseDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
EOL
check_error "Failed to create App.tsx"

# Create Navbar Component
cat > src/components/layout/NavBar.tsx << 'EOL'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-surface shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-primary font-bold text-xl">
              Study Circle Hub
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-text-primary hover:text-primary px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/courses" className="text-text-primary hover:text-primary px-3 py-2 rounded-md">
              Courses
            </Link>
            <Link to="/login" className="text-text-primary hover:text-primary px-3 py-2 rounded-md">
              Log In
            </Link>
            <Link to="/register" className="btn-primary">
              Sign Up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button 
              type="button" 
              className="text-text-primary hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface pb-3 px-4">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="text-text-primary hover:text-primary px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/courses" className="text-text-primary hover:text-primary px-3 py-2 rounded-md">
              Courses
            </Link>
            <Link to="/login" className="text-text-primary hover:text-primary px-3 py-2 rounded-md">
              Log In
            </Link>
            <Link to="/register" className="btn-primary text-center">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
EOL
check_error "Failed to create NavBar component"

# Create Footer Component
cat > src/components/layout/Footer.tsx << 'EOL'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-text-primary text-surface py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Study Circle Hub</h3>
            <p className="text-sm">
              A platform for college students to review and share course experiences,
              study tips, and preparation resources.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary-dark">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="text-sm hover:text-primary-dark">Courses</Link>
              </li>
              <li>
                <Link to="/login" className="text-sm hover:text-primary-dark">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-sm hover:text-primary-dark">Register</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">
              Email: info@studycirclehub.com
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Study Circle Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
EOL
check_error "Failed to create Footer component"

# Create HomePage
cat > src/pages/HomePage.tsx << 'EOL'
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
                      ) : i === Math.floor(course.rating) && course.rating % 1 > 0 ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <defs>
                            <linearGradient id="halfStar">
                              <stop offset="50%" stopColor="currentColor" />
                              <stop offset="50%" stopColor="#D1D5DB" />
                            </linearGradient>
                          </defs>
                          <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
EOL
check_error "Failed to create HomePage component"

# Create NotFoundPage
cat > src/pages/NotFoundPage.tsx << 'EOL'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-text-secondary mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
EOL
check_error "Failed to create NotFoundPage component"

# Create LoginPage
cat > src/pages/auth/LoginPage.tsx << 'EOL'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add authentication logic here
    console.log('Login data:', formData);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2"
              />
              <label htmlFor="remember" className="text-sm text-text-secondary">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-primary hover:text-primary-dark">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="w-full btn-primary">
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-text-secondary">
            Don't have an account? 
            <Link to="/register" className="ml-1 text-primary hover:text-primary-dark">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
EOL
check_error "Failed to create LoginPage component"

# Create RegisterPage
cat > src/pages/auth/RegisterPage.tsx << 'EOL'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add registration logic here
    console.log('Registration data:', formData);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="college" className="block mb-1 font-medium">
              College/University
            </label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm text-text-secondary">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          <button type="submit" className="w-full btn-primary">
            Create Account
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-text-secondary">
            Already have an account?
            <Link to="/login" className="ml-1 text-primary hover:text-primary-dark">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
EOL
check_error "Failed to create RegisterPage component"

# Create CoursesPage
cat > src/pages/courses/CoursesPage.tsx << 'EOL'
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
  const colleges = [...new Set(allCourses.map(course => course.college))];
  const professors = [...new Set(allCourses.map(course => course.professor))];
  const difficulties = [...new Set(allCourses.map(course => course.difficulty))];

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
          
