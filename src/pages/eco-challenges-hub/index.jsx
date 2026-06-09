import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import ChallengeProgressHeader from './components/ChallengeProgressHeader';
import ChallengeTabNavigation from './components/ChallengeTabNavigation';
import CategoryFilter from './components/CategoryFilter';
import ChallengeCard from './components/ChallengeCard';
import LeaderboardSection from './components/LeaderboardSection';
import AchievementBadges from './components/AchievementBadges';
import SocialFeed from './components/SocialFeed';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EcoChallengesHub = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState('weekly');

  // Mock user stats
  const userStats = {
    level: 7,
    points: 2847,
    streak: 12,
    nextLevelPoints: 3000
  };

  // Mock current user
  const currentUser = {
    id: 'user-1',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    level: 7,
    points: 2847,
    rank: 15,
    completedChallenges: 23
  };

  // Mock active challenges
  const activeChallenges = [
    {
      id: 'ac-1',
      title: 'Zero Waste Week',
      description: 'Reduce your household waste to zero for 7 consecutive days by composting, recycling, and avoiding single-use items.',
      category: 'Waste',
      difficulty: 'Hard',
      duration: '7 days',
      points: 500,
      participants: '2.3k',
      progress: 65
    },
    {
      id: 'ac-2',
      title: 'Bike to Work Challenge',
      description: 'Use your bicycle for all work commutes this week instead of driving or taking public transport.',
      category: 'Transportation',
      difficulty: 'Medium',
      duration: '5 days',
      points: 300,
      participants: '1.8k',
      progress: 40
    },
    {
      id: 'ac-3',
      title: 'Energy Saver Sprint',
      description: 'Reduce your daily energy consumption by 25% through mindful usage of appliances and lighting.',
      category: 'Energy',
      difficulty: 'Easy',
      duration: '3 days',
      points: 150,
      participants: '4.1k',
      progress: 85
    }
  ];

  // Mock available challenges
  const availableChallenges = [
    {
      id: 'av-1',
      title: 'Plastic-Free Shopping',
      description: 'Complete your weekly grocery shopping without using any plastic bags or containers.',
      category: 'Consumption',
      difficulty: 'Medium',
      duration: '1 day',
      points: 200,
      participants: '3.2k'
    },
    {
      id: 'av-2',
      title: 'Water Conservation Master',
      description: 'Implement water-saving techniques to reduce your daily water usage by 30%.',
      category: 'Water',
      difficulty: 'Hard',
      duration: '14 days',
      points: 600,
      participants: '1.5k'
    },
    {
      id: 'av-3',
      title: 'Local Food Champion',
      description: 'Source all your meals from local farmers and producers within a 50-mile radius.',
      category: 'Food',
      difficulty: 'Medium',
      duration: '7 days',
      points: 400,
      participants: '987'
    },
    {
      id: 'av-4',
      title: 'Digital Detox for Earth',
      description: 'Reduce your digital carbon footprint by limiting screen time and using eco-friendly apps.',
      category: 'Energy',
      difficulty: 'Easy',
      duration: '3 days',
      points: 180,
      participants: '2.7k'
    },
    {
      id: 'av-5',
      title: 'Upcycling Workshop',
      description: 'Transform 5 household items into useful objects instead of throwing them away.',
      category: 'Waste',
      difficulty: 'Medium',
      duration: '10 days',
      points: 350,
      participants: '1.9k'
    },
    {
      id: 'av-6',
      title: 'Green Commute Week',
      description: 'Use only sustainable transportation methods (walking, cycling, public transport) for all trips.',
      category: 'Transportation',
      difficulty: 'Hard',
      duration: '7 days',
      points: 450,
      participants: '1.2k'
    }
  ];

  // Mock completed challenges
  const completedChallenges = [
    {
      id: 'co-1',
      title: 'Meatless Monday Month',
      description: 'Successfully avoided meat consumption every Monday for an entire month.',
      category: 'Food',
      difficulty: 'Easy',
      duration: '30 days',
      points: 400,
      participants: '5.6k',
      completedDate: '2025-07-15'
    },
    {
      id: 'co-2',
      title: 'Solar Power Advocate',
      description: 'Installed solar panels and achieved 50% renewable energy usage in your home.',
      category: 'Energy',
      difficulty: 'Hard',
      duration: '60 days',
      points: 800,
      participants: '892',
      completedDate: '2025-07-10'
    }
  ];

  // Mock categories
  const categories = [
    { name: 'All', count: 11 },
    { name: 'Energy', count: 3 },
    { name: 'Waste', count: 2 },
    { name: 'Transportation', count: 2 },
    { name: 'Consumption', count: 1 },
    { name: 'Water', count: 1 },
    { name: 'Food', count: 2 }
  ];

  // Mock leaderboard
  const leaderboard = [
    {
      id: 'user-2',
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      level: 12,
      points: 5420,
      rank: 1,
      completedChallenges: 47
    },
    {
      id: 'user-3',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      level: 11,
      points: 4890,
      rank: 2,
      completedChallenges: 42
    },
    {
      id: 'user-4',
      name: 'Sarah Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      level: 10,
      points: 4320,
      rank: 3,
      completedChallenges: 38
    },
    {
      id: 'user-5',
      name: 'David Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      level: 9,
      points: 3950,
      rank: 4,
      completedChallenges: 35
    },
    {
      id: 'user-6',
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      level: 9,
      points: 3780,
      rank: 5,
      completedChallenges: 33
    }
  ];

  // Mock achievements
  const achievements = [
    {
      id: 'ach-1',
      name: 'First Steps',
      description: 'Complete your first eco challenge',
      type: 'challenges',
      rarity: 'common',
      points: 50,
      earned: true
    },
    {
      id: 'ach-2',
      name: 'Streak Master',
      description: 'Maintain a 30-day activity streak',
      type: 'streak',
      rarity: 'rare',
      points: 200,
      earned: true
    },
    {
      id: 'ach-3',
      name: 'Point Collector',
      description: 'Earn 5,000 total points',
      type: 'points',
      rarity: 'epic',
      points: 300,
      earned: false,
      progress: 2847,
      target: 5000
    },
    {
      id: 'ach-4',
      name: 'Social Butterfly',
      description: 'Get 100 likes on your activities',
      type: 'social',
      rarity: 'rare',
      points: 150,
      earned: false,
      progress: 67,
      target: 100
    },
    {
      id: 'ach-5',
      name: 'Waste Warrior',
      description: 'Complete 10 waste-related challenges',
      type: 'category',
      rarity: 'epic',
      points: 400,
      earned: false,
      progress: 6,
      target: 10
    },
    {
      id: 'ach-6',
      name: 'Eco Legend',
      description: 'Reach level 15',
      type: 'challenges',
      rarity: 'legendary',
      points: 1000,
      earned: false,
      progress: 7,
      target: 15
    }
  ];

  const recentAchievements = [
    {
      id: 'ach-2',
      name: 'Streak Master',
      description: 'Maintain a 30-day activity streak',
      type: 'streak',
      rarity: 'rare',
      points: 200
    }
  ];

  // Mock social activities
  const socialActivities = [
    {
      id: 'act-1',
      user: {
        name: 'Emma Thompson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      type: 'challenge_completed',
      description: 'Just completed the Zero Waste Week challenge! 🌱 Managed to produce absolutely no waste for 7 days straight.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
      timestamp: new Date(Date.now() - 1800000),
      likes: 24,
      comments: 8,
      liked: false
    },
    {
      id: 'act-2',
      user: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      type: 'achievement_earned',
      description: 'Earned the "Energy Saver" achievement by reducing my home energy consumption by 40%! 💡',
      timestamp: new Date(Date.now() - 3600000),
      likes: 18,
      comments: 5,
      liked: true
    },
    {
      id: 'act-3',
      user: {
        name: 'Sarah Williams',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      type: 'streak_milestone',
      description: 'Hit my 50-day streak! Every small action counts towards a sustainable future. 🔥',
      timestamp: new Date(Date.now() - 7200000),
      likes: 31,
      comments: 12,
      liked: false
    }
  ];

  const getCurrentChallenges = () => {
    let challenges = [];
    
    switch (activeTab) {
      case 'active':
        challenges = activeChallenges;
        break;
      case 'available':
        challenges = availableChallenges;
        break;
      case 'completed':
        challenges = completedChallenges;
        break;
      default:
        challenges = [];
    }

    if (selectedCategory === 'All') {
      return challenges;
    }

    return challenges.filter(challenge => challenge.category === selectedCategory);
  };

  const tabCounts = {
    active: activeChallenges.length,
    available: availableChallenges.length,
    completed: completedChallenges.length
  };

  const handleJoinChallenge = (challengeId) => {
    console.log('Joining challenge:', challengeId);
    // In a real app, this would make an API call
  };

  const handleCheckIn = (challengeId) => {
    console.log('Checking in for challenge:', challengeId);
    // In a real app, this would update the challenge progress
  };

  const handleViewDetails = (challengeId) => {
    console.log('Viewing challenge details:', challengeId);
    // In a real app, this would open a detailed view or modal
  };

  const handleLikeActivity = (activityId) => {
    console.log('Liking activity:', activityId);
    // In a real app, this would update the like status
  };

  const handleCommentActivity = (activityId) => {
    console.log('Commenting on activity:', activityId);
    // In a real app, this would open a comment interface
  };

  useEffect(() => {
    document.title = 'Eco Challenges Hub - EcoHub';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Header */}
          <ChallengeProgressHeader userStats={userStats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tab Navigation */}
              <ChallengeTabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                counts={tabCounts}
              />

              {/* Category Filter */}
              {activeTab !== 'completed' && (
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              )}

              {/* Challenge Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getCurrentChallenges().map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    isActive={activeTab === 'active'}
                    onJoin={handleJoinChallenge}
                    onCheckIn={handleCheckIn}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {getCurrentChallenges().length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No challenges found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or check back later for new challenges.
                  </p>
                  {selectedCategory !== 'All' && (
                    <Button
                      variant="outline"
                      onClick={() => setSelectedCategory('All')}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Leaderboard */}
              <LeaderboardSection
                leaderboard={leaderboard}
                currentUser={currentUser}
                timeframe={leaderboardTimeframe}
                onTimeframeChange={setLeaderboardTimeframe}
              />

              {/* Achievements */}
              <AchievementBadges
                achievements={achievements}
                recentAchievements={recentAchievements}
              />

              {/* Social Feed */}
              <SocialFeed
                activities={socialActivities}
                onLike={handleLikeActivity}
                onComment={handleCommentActivity}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EcoChallengesHub;