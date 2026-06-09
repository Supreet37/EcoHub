import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import FeaturedTip from './components/FeaturedTip';
import TipCard from './components/TipCard';
import CategoryFilter from './components/CategoryFilter';
import PersonalizationPanel from './components/PersonalizationPanel';
import TipSubmissionForm from './components/TipSubmissionForm';

const DailyGreenTips = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);
  const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false);
  const [tips, setTips] = useState([]);
  const [featuredTip, setFeaturedTip] = useState(null);
  const [preferences, setPreferences] = useState({
    categories: ['energy', 'waste', 'transport'],
    frequency: 'daily',
    difficulty: 'all',
    seasonalTips: true,
    challengeRelated: true,
    emailNotifications: false
  });

  // Mock data for tips
  const mockTips = [
    {
      id: 1,
      title: "Switch to LED Light Bulbs",
      description: "Replace traditional incandescent bulbs with LED bulbs to reduce energy consumption by up to 80% and last 25 times longer.",
      category: "Energy Saving",
      difficulty: "Easy",
      rating: 5,
      impact: "High - 80% energy savings",
      timeToRead: 2,
      completedBy: 1247,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      actionSteps: [
        "Calculate how many bulbs you need to replace",
        "Purchase LED bulbs with appropriate wattage",
        "Replace bulbs one room at a time",
        "Dispose of old bulbs properly at recycling center"
      ],
      completed: false,
      bookmarked: false,
      createdAt: new Date('2025-07-20')
    },
    {
      id: 2,
      title: "Start Composting Kitchen Scraps",
      description: "Turn your food waste into nutrient-rich compost for your garden while reducing landfill waste by up to 30%.",
      category: "Waste Reduction",
      difficulty: "Medium",
      rating: 4,
      impact: "Medium - 30% waste reduction",
      timeToRead: 5,
      completedBy: 892,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      actionSteps: [
        "Choose a composting method (bin, tumbler, or pile)",
        "Collect brown materials (leaves, paper) and green materials (food scraps)",
        "Layer materials in 3:1 brown to green ratio",
        "Turn compost weekly and keep moist",
        "Harvest finished compost in 3-6 months"
      ],
      completed: false,
      bookmarked: true,
      createdAt: new Date('2025-07-19')
    },
    {
      id: 3,
      title: "Use Public Transportation Once a Week",
      description: "Reduce your carbon footprint by using public transport, walking, or cycling instead of driving for at least one trip per week.",
      category: "Sustainable Transportation",
      difficulty: "Easy",
      rating: 4,
      impact: "Medium - 20% transport emissions",
      timeToRead: 3,
      completedBy: 2156,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
      actionSteps: [
        "Plan your route using public transport apps",
        "Check schedules and purchase tickets in advance",
        "Allow extra time for your journey",
        "Bring entertainment for longer trips"
      ],
      completed: true,
      bookmarked: false,
      createdAt: new Date('2025-07-18')
    },
    {
      id: 4,
      title: "Shop with Reusable Bags",
      description: "Eliminate single-use plastic bags by bringing your own reusable shopping bags to reduce plastic waste.",
      category: "Eco-Friendly Shopping",
      difficulty: "Easy",
      rating: 5,
      impact: "Low - Reduces plastic waste",
      timeToRead: 1,
      completedBy: 3421,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      actionSteps: [
        "Purchase durable reusable bags",
        "Keep bags in your car or by the door",
        "Set phone reminders before shopping trips",
        "Choose bags made from sustainable materials"
      ],
      completed: false,
      bookmarked: false,
      createdAt: new Date('2025-07-17')
    },
    {
      id: 5,
      title: "Install Low-Flow Showerheads",
      description: "Reduce water consumption by up to 50% while maintaining good water pressure with efficient low-flow showerheads.",
      category: "Water Conservation",
      difficulty: "Medium",
      rating: 4,
      impact: "High - 50% water savings",
      timeToRead: 4,
      completedBy: 756,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
      actionSteps: [
        "Research low-flow showerhead options",
        "Turn off water supply to shower",
        "Remove old showerhead with wrench",
        "Install new showerhead with plumber\'s tape",
        "Test for leaks and adjust as needed"
      ],
      completed: false,
      bookmarked: true,
      createdAt: new Date('2025-07-16')
    },
    {
      id: 6,
      title: "Grow Your Own Herbs",
      description: "Start a small herb garden to reduce packaging waste and enjoy fresh, organic herbs year-round.",
      category: "Sustainable Living",
      difficulty: "Easy",
      rating: 5,
      impact: "Low - Reduces packaging",
      timeToRead: 3,
      completedBy: 1834,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      actionSteps: [
        "Choose easy-to-grow herbs like basil, mint, parsley",
        "Select appropriate containers with drainage",
        "Use quality potting soil",
        "Place in sunny location and water regularly",
        "Harvest frequently to encourage growth"
      ],
      completed: false,
      bookmarked: false,
      createdAt: new Date('2025-07-15')
    }
  ];

  const categories = ['All', 'Energy Saving', 'Waste Reduction', 'Sustainable Transportation', 'Eco-Friendly Shopping', 'Water Conservation', 'Sustainable Living'];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'difficulty', label: 'Easiest First' }
  ];

  useEffect(() => {
    // Set featured tip (today's tip)
    setFeaturedTip(mockTips[0]);
    setTips(mockTips);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleBookmark = (tipId, bookmarked) => {
    setTips(prev => prev.map(tip => 
      tip.id === tipId ? { ...tip, bookmarked } : tip
    ));
    
    if (featuredTip && featuredTip.id === tipId) {
      setFeaturedTip(prev => ({ ...prev, bookmarked }));
    }
  };

  const handleComplete = (tipId, completed) => {
    setTips(prev => prev.map(tip => 
      tip.id === tipId ? { ...tip, completed } : tip
    ));
    
    if (featuredTip && featuredTip.id === tipId) {
      setFeaturedTip(prev => ({ ...prev, completed }));
    }
  };

  const handleShare = (tip) => {
    if (navigator.share) {
      navigator.share({
        title: tip.title,
        text: tip.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${tip.title}\n\n${tip.description}\n\n${window.location.href}`);
      alert('Tip copied to clipboard!');
    }
  };

  const handleSavePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    // In a real app, this would save to backend/localStorage
    localStorage.setItem('greenTipsPreferences', JSON.stringify(newPreferences));
  };

  const handleSubmitTip = (tipData) => {
    const newTip = {
      id: tips.length + 1,
      ...tipData,
      rating: 0,
      completedBy: 0,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      completed: false,
      bookmarked: false,
      createdAt: new Date()
    };
    
    setTips(prev => [newTip, ...prev]);
    alert('Thank you for submitting your tip! It will be reviewed and published soon.');
  };

  // Filter and sort tips
  const filteredAndSortedTips = tips
    .filter(tip => {
      const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tip.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.completedBy - a.completedBy;
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-16">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Daily Green Tips
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover practical, actionable sustainability advice to reduce your environmental impact one day at a time.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <Input
                    type="text"
                    placeholder="Search tips..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Sort by"
                  className="w-40"
                />
                
                <Button
                  variant="outline"
                  onClick={() => setIsPersonalizationOpen(true)}
                  iconName="Settings"
                  iconPosition="left"
                >
                  Personalize
                </Button>

                <Button
                  variant="default"
                  onClick={() => setIsSubmissionFormOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Submit Tip
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Featured Tip */}
          {featuredTip && (
            <div className="mb-8">
              <FeaturedTip
                tip={featuredTip}
                onBookmark={handleBookmark}
                onComplete={handleComplete}
                onShare={handleShare}
              />
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Tips Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                {selectedCategory === 'All' ? 'All Tips' : selectedCategory} 
                <span className="text-muted-foreground ml-2">
                  ({filteredAndSortedTips.length})
                </span>
              </h2>
              
              {searchQuery && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Search" size={16} />
                  <span>Results for "{searchQuery}"</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery('')}
                    iconName="X"
                  />
                </div>
              )}
            </div>

            {filteredAndSortedTips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedTips.map((tip) => (
                  <TipCard
                    key={tip.id}
                    tip={tip}
                    onBookmark={handleBookmark}
                    onComplete={handleComplete}
                    onShare={handleShare}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No tips found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="mt-12 bg-muted/50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {tips.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Tips</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success mb-1">
                  {tips.filter(tip => tip.completed).length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">
                  {tips.filter(tip => tip.bookmarked).length}
                </div>
                <div className="text-sm text-muted-foreground">Bookmarked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary mb-1">
                  {Math.round(tips.reduce((sum, tip) => sum + tip.rating, 0) / tips.length * 10) / 10}
                </div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Personalization Panel */}
      <PersonalizationPanel
        isOpen={isPersonalizationOpen}
        onClose={() => setIsPersonalizationOpen(false)}
        preferences={preferences}
        onSavePreferences={handleSavePreferences}
      />

      {/* Tip Submission Form */}
      <TipSubmissionForm
        isOpen={isSubmissionFormOpen}
        onClose={() => setIsSubmissionFormOpen(false)}
        onSubmit={handleSubmitTip}
      />
    </div>
  );
};

export default DailyGreenTips;