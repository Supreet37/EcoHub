import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SocialFeed = ({ activities, onLike, onComment }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'challenge_completed': return 'CheckCircle';
      case 'achievement_earned': return 'Award';
      case 'streak_milestone': return 'Flame';
      case 'level_up': return 'TrendingUp';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'challenge_completed': return 'text-success';
      case 'achievement_earned': return 'text-warning';
      case 'streak_milestone': return 'text-accent';
      case 'level_up': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="Users" size={20} />
        <span>Community Activity</span>
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-foreground">{activity.user.name}</p>
                  <Icon 
                    name={getActivityIcon(activity.type)} 
                    size={16} 
                    className={getActivityColor(activity.type)}
                  />
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                
                {activity.image && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={activity.image}
                      alt="Activity image"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onLike(activity.id)}
                    className={`flex items-center space-x-1 text-sm eco-transition ${
                      activity.liked
                        ? 'text-error' :'text-muted-foreground hover:text-error'
                    }`}
                  >
                    <Icon name={activity.liked ? 'Heart' : 'Heart'} size={16} />
                    <span>{activity.likes}</span>
                  </button>
                  
                  <button
                    onClick={() => onComment(activity.id)}
                    className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground eco-transition"
                  >
                    <Icon name="MessageCircle" size={16} />
                    <span>{activity.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground eco-transition">
                    <Icon name="Share" size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Plus">
          Share Your Progress
        </Button>
      </div>
    </div>
  );
};

export default SocialFeed;