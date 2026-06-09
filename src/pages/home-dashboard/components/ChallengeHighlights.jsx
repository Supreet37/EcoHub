import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChallengeHighlights = () => {
  const navigate = useNavigate();

  const featuredChallenges = [
    {
      id: 1,
      title: "Plastic-Free Week",
      description: "Eliminate single-use plastics for 7 days",
      difficulty: "Medium",
      duration: "7 days",
      participants: 2847,
      reward: "250 EcoPoints",
      icon: "Recycle",
      color: "secondary",
      progress: 65,
      status: "active",
      daysLeft: 3
    },
    {
      id: 2,
      title: "Energy Saver Challenge",
      description: "Reduce electricity usage by 20%",
      difficulty: "Easy",
      duration: "14 days",
      participants: 1923,
      reward: "180 EcoPoints",
      icon: "Zap",
      color: "accent",
      progress: 0,
      status: "starting_soon",
      daysLeft: 2
    },
    {
      id: 3,
      title: "Green Commute Month",
      description: "Use eco-friendly transportation",
      difficulty: "Hard",
      duration: "30 days",
      participants: 856,
      reward: "500 EcoPoints",
      icon: "Bike",
      color: "success",
      progress: 100,
      status: "completed",
      daysLeft: 0
    }
  ];

  const colorClasses = {
    secondary: 'text-secondary bg-secondary/10 border-secondary/20',
    accent: 'text-accent bg-accent/10 border-accent/20',
    success: 'text-success bg-success/10 border-success/20'
  };

  const iconColorClasses = {
    secondary: 'text-secondary',
    accent: 'text-accent',
    success: 'text-success'
  };

  const statusConfig = {
    active: {
      label: 'In Progress',
      color: 'text-primary bg-primary/10',
      icon: 'Play'
    },
    starting_soon: {
      label: 'Starting Soon',
      color: 'text-warning bg-warning/10',
      icon: 'Clock'
    },
    completed: {
      label: 'Completed',
      color: 'text-success bg-success/10',
      icon: 'CheckCircle'
    }
  };

  const difficultyColors = {
    Easy: 'text-success',
    Medium: 'text-warning',
    Hard: 'text-error'
  };

  return (
    <div className="bg-card rounded-xl border border-border eco-shadow-card p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Challenge Highlights
          </h2>
          <p className="text-muted-foreground">
            Join our community in making a positive impact
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Target"
          iconPosition="left"
          onClick={() => navigate('/eco-challenges-hub')}
        >
          View All
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {featuredChallenges.map((challenge) => (
          <div key={challenge.id} className="group border border-border rounded-lg p-5 hover:shadow-md eco-transition">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${colorClasses[challenge.color]}`}>
                <Icon name={challenge.icon} size={20} className={iconColorClasses[challenge.color]} />
              </div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[challenge.status].color}`}>
                <Icon name={statusConfig[challenge.status].icon} size={12} className="mr-1" />
                {statusConfig[challenge.status].label}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground group-hover:text-primary eco-transition">
                {challenge.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {challenge.description}
              </p>

              {/* Progress Bar (for active challenges) */}
              {challenge.status === 'active' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Challenge Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground">Difficulty</div>
                  <div className={`font-medium ${difficultyColors[challenge.difficulty]}`}>
                    {challenge.difficulty}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Duration</div>
                  <div className="font-medium text-foreground">{challenge.duration}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Participants</div>
                  <div className="font-medium text-foreground">{challenge.participants.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Reward</div>
                  <div className="font-medium text-accent">{challenge.reward}</div>
                </div>
              </div>

              {/* Days Left (for active/upcoming challenges) */}
              {challenge.daysLeft > 0 && (
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Calendar" size={12} />
                  <span>
                    {challenge.status === 'active' ? `${challenge.daysLeft} days left` : `Starts in ${challenge.daysLeft} days`}
                  </span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                variant={challenge.status === 'completed' ? 'secondary' : 'outline'}
                size="sm"
                iconName={challenge.status === 'completed' ? 'Award' : 'ArrowRight'}
                iconPosition="right"
                onClick={() => navigate('/eco-challenges-hub')}
                className="w-full"
                disabled={challenge.status === 'completed'}
              >
                {challenge.status === 'completed' ? 'View Results' : 
                 challenge.status === 'active' ? 'Continue Challenge' : 'Join Challenge'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Community Stats */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">127</div>
            <div className="text-sm text-muted-foreground">Active Challenges</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">45K</div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">892</div>
            <div className="text-sm text-muted-foreground">Challenges Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">2.1M</div>
            <div className="text-sm text-muted-foreground">EcoPoints Earned</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeHighlights;