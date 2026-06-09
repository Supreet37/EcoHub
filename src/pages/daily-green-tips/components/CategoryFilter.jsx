import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const categoryIcons = {
    'All': 'Grid3X3',
    'Energy Saving': 'Zap',
    'Waste Reduction': 'Recycle',
    'Sustainable Transportation': 'Car',
    'Eco-Friendly Shopping': 'ShoppingBag',
    'Water Conservation': 'Droplets',
    'Sustainable Living': 'Leaf'
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium eco-transition ${
            selectedCategory === category
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
          }`}
        >
          <Icon 
            name={categoryIcons[category] || 'Tag'} 
            size={16} 
          />
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;