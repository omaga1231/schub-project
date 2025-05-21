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
