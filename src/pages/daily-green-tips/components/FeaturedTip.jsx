import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedTip = ({ tip, onBookmark, onComplete, onShare }) => {
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

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-border eco-shadow-modal overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={20} className="text-accent fill-current" />
            <span className="text-sm font-medium text-accent">Today's Featured Tip</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Content */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {tip.title}
              </h2>
              <p className="text-muted-foreground">
                {tip.description}
              </p>
            </div>

            {/* Action Steps */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                How to implement:
              </h3>
              <div className="space-y-2">
                {tip.actionSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={18} className="text-success" />
                <span className="text-sm font-medium text-foreground">Impact: {tip.impact}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tip.difficulty)}`}>
                {tip.difficulty}
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{tip.timeToRead} min</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-2">
              <Button
                variant={isCompleted ? "success" : "default"}
                onClick={handleComplete}
                iconName={isCompleted ? "Check" : "CheckCircle"}
                iconPosition="left"
              >
                {isCompleted ? 'Completed Today' : 'Mark as Done'}
              </Button>
              <Button
                variant={isBookmarked ? "secondary" : "outline"}
                onClick={handleBookmark}
                iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
                iconPosition="left"
              >
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => onShare(tip)}
                iconName="Share2"
                iconPosition="left"
              >
                Share
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden">
              <Image
                src={tip.image}
                alt={tip.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-3 right-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < tip.rating ? 'text-accent fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                  <span className="text-sm font-medium text-foreground ml-1">
                    {tip.rating}.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTip;