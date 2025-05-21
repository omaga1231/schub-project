import React from 'react';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface CourseFiltersProps {
  difficulties: FilterOption[];
  ratings: FilterOption[];
  selectedFilters: {
    difficulty: string;
    rating: string;
    hasTips: boolean;
  };
  onFilterChange: (filterType: string, value: string | boolean) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  difficulties,
  ratings,
  selectedFilters,
  onFilterChange,
}) => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        
        {/* Difficulty Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Difficulty Level
          </label>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <label
                key={difficulty.value}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="difficulty"
                  value={difficulty.value}
                  checked={selectedFilters.difficulty === difficulty.value}
                  onChange={(e) => onFilterChange('difficulty', e.target.value)}
                  className="form-radio text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  {difficulty.label}
                  {difficulty.count !== undefined && (
                    <span className="ml-1 text-text-secondary">({difficulty.count})</span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Minimum Rating
          </label>
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label
                key={rating.value}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="rating"
                  value={rating.value}
                  checked={selectedFilters.rating === rating.value}
                  onChange={(e) => onFilterChange('rating', e.target.value)}
                  className="form-radio text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                  {rating.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Has Study Tips Filter */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedFilters.hasTips}
              onChange={(e) => onFilterChange('hasTips', e.target.checked)}
              className="form-checkbox text-primary focus:ring-primary"
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
              Has Study Tips
            </span>
          </label>
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          onFilterChange('difficulty', '');
          onFilterChange('rating', '');
          onFilterChange('hasTips', false);
        }}
        className="text-sm text-text-secondary hover:text-primary transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
};

export default CourseFilters;

