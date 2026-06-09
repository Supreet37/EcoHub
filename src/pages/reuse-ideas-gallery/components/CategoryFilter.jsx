import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const categoryIcons = {
    'all': 'Grid3X3',
    'plastic': 'Recycle',
    'glass': 'Wine',
    'fabric': 'Shirt',
    'electronics': 'Smartphone',
    'paper': 'FileText',
    'metal': 'Wrench',
    'wood': 'TreePine'
  };

  return (
    <div className="flex overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex space-x-2 min-w-max px-4 sm:px-6 lg:px-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap eco-transition ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground hover:bg-muted border border-border'
            }`}
          >
            <Icon 
              name={categoryIcons[category.id] || 'Circle'} 
              size={16} 
            />
            <span>{category.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeCategory === category.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
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