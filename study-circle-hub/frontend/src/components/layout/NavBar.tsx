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
