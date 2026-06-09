import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements, recentAchievements }) => {
  const getBadgeIcon = (type) => {
    switch (type) {
      case 'streak': return 'Flame';
      case 'points': return 'Star';
      case 'challenges': return 'Target';
      case 'social': return 'Users';
      case 'category': return 'Award';
      default: return 'Medal';
    }
  };

  const getBadgeColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-muted-foreground bg-muted';
      case 'rare': return 'text-primary bg-primary/10';
      case 'epic': return 'text-warning bg-warning/10';
      case 'legendary': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="Award" size={20} />
        <span>Achievements</span>
      </h2>

      {recentAchievements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Recently Earned</h3>
          <div className="space-y-2">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getBadgeColor(achievement.rarity)}`}>
                  <Icon name={getBadgeIcon(achievement.type)} size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <div className="text-xs text-success font-medium">
                  +{achievement.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border eco-transition hover:scale-105 ${
              achievement.earned
                ? 'bg-background border-border' :'bg-muted/50 border-muted opacity-60'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto ${
              achievement.earned ? getBadgeColor(achievement.rarity) : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={getBadgeIcon(achievement.type)} size={24} />
            </div>
            
            <div className="text-center">
              <p className={`font-medium text-sm mb-1 ${
                achievement.earned ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement.name}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {achievement.description}
              </p>
              
              {achievement.progress !== undefined && !achievement.earned && (
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-500"
                      style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {achievement.progress}/{achievement.target}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;