import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const categoryIcons = {
    'All': 'Grid3x3',
    'Energy': 'Zap',
    'Waste': 'Trash2',
    'Transportation': 'Car',
    'Consumption': 'ShoppingCart',
    'Water': 'Droplets',
    'Food': 'Apple'
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium eco-transition ${
              selectedCategory === category.name
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            <Icon name={categoryIcons[category.name] || 'Leaf'} size={14} />
            <span>{category.name}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
              selectedCategory === category.name
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-background text-muted-foreground'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;