import React from 'react';
import Icon from '../../../components/AppIcon';

const ChallengeProgressHeader = ({ userStats }) => {
  const { level, points, streak, nextLevelPoints } = userStats;
  const progressPercentage = (points / nextLevelPoints) * 100;

  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="Trophy" size={24} color="white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Level {level} Eco Warrior</h2>
            <p className="text-white/80">Keep up the amazing work!</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{points.toLocaleString()}</div>
            <div className="text-sm text-white/80">Total Points</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{streak}</div>
            <div className="text-sm text-white/80">Day Streak</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress to Level {level + 1}</span>
          <span>{points}/{nextLevelPoints} points</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChallengeProgressHeader;