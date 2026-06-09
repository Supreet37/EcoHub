import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchTerm, onSearchChange, onFilterToggle }) => {
  return (
    <div className="flex items-center space-x-3 w-full">
      <div className="flex-1 relative">
        <Input
          type="search"
          placeholder="Search reuse ideas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
        />
      </div>
      <button
        onClick={onFilterToggle}
        className="p-2 rounded-lg border border-border bg-card hover:bg-muted eco-transition flex items-center justify-center"
        aria-label="Toggle filters"
      >
        <Icon name="Filter" size={20} />
      </button>
    </div>
  );
};

export default SearchBar;