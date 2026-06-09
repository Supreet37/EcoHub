import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TipCard = ({ tip, onBookmark, onComplete, onShare }) => {
  const [isCompleted, setIsCompleted] = useState(tip.completed || false);
  const [isBookmarked, setIsBookmarked] = useState(tip.bookmarked || false);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
    onComplete(tip.id, !isCompleted);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(tip.id, !isBookmarked);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Energy Saving': 'bg-blue-100 text-blue-800',
      'Waste Reduction': 'bg-green-100 text-green-800',
      'Sustainable Transportation': 'bg-purple-100 text-purple-800',
      'Eco-Friendly Shopping': 'bg-orange-100 text-orange-800',
      'Water Conservation': 'bg-cyan-100 text-cyan-800',
      'Sustainable Living': 'bg-emerald-100 text-emerald-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-card rounded-lg border border-border eco-shadow-card overflow-hidden eco-transition hover:shadow-lg">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tip.image}
          alt={tip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tip.category)}`}>
            {tip.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full eco-transition ${
              isBookmarked 
                ? 'bg-accent text-accent-foreground' 
                : 'bg-white/80 text-foreground hover:bg-white'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Icon name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">
            {tip.title}
          </h3>
          <div className="flex items-center ml-2">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={i < tip.rating ? 'text-accent fill-current' : 'text-muted-foreground'}
              />
            ))}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
          {tip.description}
        </p>

        {/* Action Steps */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Action Steps:</h4>
          <ul className="space-y-1">
            {tip.actionSteps.slice(0, 2).map((step, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start">
                <Icon name="ChevronRight" size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                <span>{step}</span>
              </li>
            ))}
            {tip.actionSteps.length > 2 && (
              <li className="text-sm text-muted-foreground">
                +{tip.actionSteps.length - 2} more steps
              </li>
            )}
          </ul>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={14} className="text-success" />
              <span className="text-sm text-muted-foreground">{tip.impact}</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tip.difficulty)}`}>
              {tip.difficulty}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {tip.timeToRead} min read
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={isCompleted ? "success" : "outline"}
              size="sm"
              onClick={handleComplete}
              iconName={isCompleted ? "Check" : "CheckCircle"}
              iconPosition="left"
            >
              {isCompleted ? 'Completed' : 'Mark Done'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare(tip)}
              iconName="Share2"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            {tip.completedBy} completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCard;