import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LeaderboardSection = ({ leaderboard, currentUser, timeframe, onTimeframeChange }) => {
  const timeframes = [
    { id: 'weekly', label: 'This Week' },
    { id: 'monthly', label: 'This Month' },
    { id: 'allTime', label: 'All Time' }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Trophy" size={20} />
          <span>Leaderboard</span>
        </h2>
        
        <div className="flex bg-muted rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf.id}
              onClick={() => onTimeframeChange(tf.id)}
              className={`px-3 py-1 rounded-md text-sm font-medium eco-transition ${
                timeframe === tf.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {leaderboard.map((user, index) => (
          <div
            key={user.id}
            className={`flex items-center space-x-3 p-3 rounded-lg eco-transition ${
              user.id === currentUser.id
                ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50'
            }`}
          >
            <div className="flex-shrink-0 w-8 text-center font-bold text-lg">
              {getRankIcon(user.rank)}
            </div>
            
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-foreground truncate">{user.name}</p>
                {user.id === currentUser.id && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    You
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Level {user.level} • {user.completedChallenges} challenges
              </p>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-foreground">{user.points.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
          </div>
        ))}
      </div>

      {currentUser.rank > 10 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex-shrink-0 w-8 text-center font-bold text-lg">
              #{currentUser.rank}
            </div>
            
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-foreground">{currentUser.name}</p>
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                  You
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Level {currentUser.level} • {currentUser.completedChallenges} challenges
              </p>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-foreground">{currentUser.points.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardSection;