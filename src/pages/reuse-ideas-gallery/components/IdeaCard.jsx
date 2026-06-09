import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const IdeaCard = ({ idea, onBookmark, onViewDetails, isBookmarked }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-success bg-success/10';
      case 'intermediate':
        return 'text-warning bg-warning/10';
      case 'advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getDifficultyStars = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 1;
      case 'intermediate':
        return 2;
      case 'advanced':
        return 3;
      default:
        return 1;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden eco-shadow-card eco-transition hover:eco-shadow-modal group">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <Image
          src={idea.image}
          alt={idea.title}
          className="w-full h-full object-cover group-hover:scale-105 eco-transition"
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={() => onBookmark(idea.id)}
            className={`p-2 rounded-full backdrop-blur-sm eco-transition ${
              isBookmarked
                ? 'bg-primary text-primary-foreground'
                : 'bg-white/80 text-foreground hover:bg-white'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Icon name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} size={16} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getDifficultyColor(idea.difficulty)}`}>
            {idea.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
          {idea.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {idea.description}
        </p>

        {/* Materials */}
        <div className="flex flex-wrap gap-1 mb-3">
          {idea.materials.slice(0, 3).map((material, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {material}
            </span>
          ))}
          {idea.materials.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{idea.materials.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{idea.timeRequired}</span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={12}
                  className={i < getDifficultyStars(idea.difficulty) ? 'text-warning' : 'text-muted'}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-success">
            <Icon name="Leaf" size={14} />
            <span>{idea.environmentalImpact}</span>
          </div>
        </div>

        {/* Tools */}
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Wrench" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {idea.tools.join(', ')}
          </span>
        </div>

        {/* Action */}
        <Button
          variant="outline"
          onClick={() => onViewDetails(idea)}
          className="w-full"
          iconName="Eye"
          iconPosition="left"
        >
          View Instructions
        </Button>
      </div>
    </div>
  );
};

export default IdeaCard;