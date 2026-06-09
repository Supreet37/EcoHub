import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChallengeCard = ({ challenge, onJoin, onCheckIn, onViewDetails, isActive = false }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'energy': return 'Zap';
      case 'waste': return 'Trash2';
      case 'transportation': return 'Car';
      case 'consumption': return 'ShoppingCart';
      default: return 'Leaf';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 eco-shadow-card eco-transition hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getCategoryIcon(challenge.category)} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">{challenge.title}</h3>
            <p className="text-sm text-muted-foreground">{challenge.category}</p>
          </div>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty}
        </div>
      </div>

      <p className="text-muted-foreground mb-4 line-clamp-2">{challenge.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{challenge.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} />
            <span>{challenge.points} pts</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{challenge.participants}</span>
          </div>
        </div>
      </div>

      {isActive && challenge.progress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{challenge.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${challenge.progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        {isActive ? (
          <>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => onCheckIn(challenge.id)}
              iconName="Check"
              className="flex-1"
            >
              Check In
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(challenge.id)}
              iconName="Eye"
            >
              Details
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => onJoin(challenge.id)}
              iconName="Plus"
              className="flex-1"
            >
              Join Challenge
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(challenge.id)}
              iconName="Info"
            >
              Learn More
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;