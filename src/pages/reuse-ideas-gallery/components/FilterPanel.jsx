import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFilterChange, onClearFilters }) => {
  if (!isOpen) return null;

  const difficultyLevels = [
    { id: 'beginner', label: 'Beginner', description: '1-2 hours, basic tools' },
    { id: 'intermediate', label: 'Intermediate', description: '2-4 hours, some experience' },
    { id: 'advanced', label: 'Advanced', description: '4+ hours, specialized tools' }
  ];

  const timeRanges = [
    { id: 'quick', label: 'Quick (< 1 hour)', value: 'quick' },
    { id: 'moderate', label: 'Moderate (1-3 hours)', value: 'moderate' },
    { id: 'extended', label: 'Extended (3+ hours)', value: 'extended' }
  ];

  const seasonalOptions = [
    { id: 'spring', label: 'Spring Projects', value: 'spring' },
    { id: 'summer', label: 'Summer Projects', value: 'summer' },
    { id: 'fall', label: 'Fall Projects', value: 'fall' },
    { id: 'winter', label: 'Winter Projects', value: 'winter' }
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted eco-transition"
              aria-label="Close filters"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Difficulty Level */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Difficulty Level</h4>
            <div className="space-y-3">
              {difficultyLevels.map((level) => (
                <Checkbox
                  key={level.id}
                  label={level.label}
                  description={level.description}
                  checked={filters.difficulty.includes(level.id)}
                  onChange={(e) => {
                    const newDifficulty = e.target.checked
                      ? [...filters.difficulty, level.id]
                      : filters.difficulty.filter(d => d !== level.id);
                    onFilterChange({ ...filters, difficulty: newDifficulty });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Time Required */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Time Required</h4>
            <div className="space-y-3">
              {timeRanges.map((time) => (
                <Checkbox
                  key={time.id}
                  label={time.label}
                  checked={filters.timeRange.includes(time.value)}
                  onChange={(e) => {
                    const newTimeRange = e.target.checked
                      ? [...filters.timeRange, time.value]
                      : filters.timeRange.filter(t => t !== time.value);
                    onFilterChange({ ...filters, timeRange: newTimeRange });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Seasonal Relevance */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Seasonal Projects</h4>
            <div className="space-y-3">
              {seasonalOptions.map((season) => (
                <Checkbox
                  key={season.id}
                  label={season.label}
                  checked={filters.seasonal.includes(season.value)}
                  onChange={(e) => {
                    const newSeasonal = e.target.checked
                      ? [...filters.seasonal, season.value]
                      : filters.seasonal.filter(s => s !== season.value);
                    onFilterChange({ ...filters, seasonal: newSeasonal });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              onClick={onClose}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;