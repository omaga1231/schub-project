import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick
}) => {
  const baseClasses = "bg-surface rounded-lg shadow-md p-6";
  const hoverClasses = hover ? "transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1" : "";
  const clickClasses = onClick ? "cursor-pointer" : "";
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickClasses} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

// Variants for different card types
export const CourseCard: React.FC<{
  title: string;
  code: string;
  professor: string;
  college: string;
  rating: number;
  onClick?: () => void;
}> = ({ title, code, professor, college, rating, onClick }) => {
  return (
    <Card hover onClick={onClick}>
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full">
          {code}
        </span>
      </div>
      <p className="text-text-secondary mb-1">Professor: {professor}</p>
      <p className="text-text-secondary mb-3">College: {college}</p>
      <div className="flex items-center">
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              {i < Math.floor(rating) ? (
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
        <span className="ml-2 text-text-secondary">{rating.toFixed(1)}</span>
      </div>
    </Card>
  );
};

export default Card;

