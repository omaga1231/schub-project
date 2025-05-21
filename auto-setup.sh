#!/bin/bash

# Fully Automated Setup Script for Study Circle Hub platform
# This script automates the complete setup process including:
# - Project structure creation
# - Frontend (React) setup
# - Backend (Express + Node.js) setup
# - Configuration files
# - Boilerplate code
# - Initial tests

# Exit on any error
set -e

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

# Function to handle errors
handle_error() {
  print_message "red" "ERROR: $1"
  print_message "red" "Setup failed at step: $2"
  exit 1
}

# Trap for interruption
trap 'handle_error "Process interrupted" "Interrupted by user"' INT

# Function to create directory if it doesn't exist
create_directory() {
  if [ ! -d "$1" ]; then
    mkdir -p "$1"
    if [ $? -ne 0 ]; then
      handle_error "Failed to create directory: $1" "Directory creation"
    fi
    print_message "green" "Created directory: $1"
  else
    print_message "yellow" "Directory already exists: $1"
  fi
}

# Welcome message
clear
print_message "blue" "====================================================="
print_message "blue" "    STUDY CIRCLE HUB - FULLY AUTOMATED SETUP"
print_message "blue" "====================================================="
print_message "green" "This script will automatically set up the complete Study Circle Hub platform:"
print_message "green" " - Frontend (React + Tailwind CSS)"
print_message "green" " - Backend (Node.js + Express + MongoDB)"
print_message "green" " - Project structure"
print_message "green" " - Configuration files"
print_message "green" " - Deployment settings"
print_message "green" " - Initial tests"
echo ""
print_message "yellow" "The process will take several minutes to complete..."
print_message "yellow" "No user input is required during the setup process."
echo ""
sleep 2  # Brief pause to read the intro

# Define project variables
PROJECT_ROOT="study-circle-hub"
MONGODB_URI="mongodb://localhost:27017/studycirclehub"
JWT_SECRET="studycirclehub_secret_jwt_token_example"
PORT=5000

# Delete existing project if it exists
if [ -d "$PROJECT_ROOT" ]; then
  print_message "yellow" "Removing existing project directory..."
  rm -rf "$PROJECT_ROOT"
  if [ $? -ne 0 ]; then
    handle_error "Failed to remove existing project directory" "Project cleanup"
  fi
  print_message "green" "Existing project directory removed"
fi

# Create project root directory
print_message "blue" "Creating project structure..."
create_directory "$PROJECT_ROOT"
cd "$PROJECT_ROOT" || handle_error "Failed to enter project directory" "Project navigation"

# Initialize Git repository
print_message "blue" "Initializing Git repository..."
git init > /dev/null 2>&1
if [ $? -ne 0 ]; then
  handle_error "Failed to initialize Git repository" "Git initialization"
fi
print_message "green" "Git repository initialized"

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
print_message "green" "Created README.md file"

# Create frontend directory
print_message "blue" "Setting up frontend structure..."
create_directory "frontend"
cd frontend || handle_error "Failed to enter frontend directory" "Directory navigation"

# Initialize package.json for frontend
print_message "yellow" "Initializing frontend package.json..."
cat > package.json << EOL
{
  "name": "study-circle-hub-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^4.9.5",
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@types/node": "^16.18.60"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOL
print_message "green" "Frontend package.json created"

# Creating the tsconfig.json file
cat > tsconfig.json << 'EOL'
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
EOL
print_message "green" "Created tsconfig.json file"

# Create src directory and subdirectories
print_message "yellow" "Creating frontend directory structure..."
create_directory "src"
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
create_directory "public"

# Setup Tailwind CSS
print_message "yellow" "Setting up Tailwind CSS..."
# Create Tailwind config
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
print_message "green" "Tailwind config created"

# Create PostCSS config
cat > postcss.config.js << 'EOL'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL
print_message "green" "PostCSS config created"

# Create index.html
cat > public/index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#10B981" />
    <meta
      name="description"
      content="Study Circle Hub - A platform for college students to review and share course experiences"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Study Circle Hub</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOL
print_message "green" "Created index.html"

# Create manifest.json
cat > public/manifest.json << 'EOL'
{
  "short_name": "Study Circle Hub",
  "name": "Study Circle Hub - Course Reviews & Resources",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#10B981",
  "background_color": "#F3F4F6"
}
EOL
print_message "green" "Created manifest.json"

# Create index.css for Tailwind
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
print_message "green" "Created index.css with Tailwind directives"

# Create index.tsx
cat > src/index.tsx << 'EOL'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
EOL
print_message "green" "Created index.tsx"

# Create reportWebVitals.ts
cat > src/reportWebVitals.ts << 'EOL'
import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
EOL
print_message "green" "Created reportWebVitals.ts"

# Create App.tsx
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
print_message "green" "Created App.tsx"

# Create NavBar Component
print_message "blue" "Creating NavBar component..."
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
print_message "green" "Created NavBar component"

# Create Footer Component
print_message "blue" "Creating Footer component..."
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
print_message "green" "Created Footer component"

# Create HomePage component
print_message "blue" "Creating HomePage component..."
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
          </Link
