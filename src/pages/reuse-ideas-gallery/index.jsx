import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import FilterPanel from './components/FilterPanel';
import IdeaCard from './components/IdeaCard';
import IdeaDetailModal from './components/IdeaDetailModal';
import AddIdeaFAB from './components/AddIdeaFAB';
import Icon from '../../components/AppIcon';

const ReuseIdeasGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [bookmarkedIdeas, setBookmarkedIdeas] = useState(new Set());
  const [filters, setFilters] = useState({
    difficulty: [],
    timeRange: [],
    seasonal: []
  });

  // Mock data for reuse ideas
  const reuseIdeas = [
    {
      id: 1,
      title: "Plastic Bottle Vertical Garden",
      description: "Transform plastic bottles into a space-saving vertical garden perfect for herbs and small plants.",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      category: "plastic",
      difficulty: "beginner",
      timeRequired: "2 hours",
      environmentalImpact: "High",
      materials: ["Plastic bottles", "Potting soil", "Seeds", "String"],
      tools: ["Scissors", "Drill", "Marker"],
      instructions: [
        "Clean plastic bottles thoroughly and remove labels",
        "Cut rectangular openings on one side of each bottle",
        "Drill small drainage holes in the bottom",
        "Thread string through bottle caps to create hanging system",
        "Fill with potting soil and plant seeds",
        "Hang in a sunny location and water regularly"
      ],
      seasonal: ["spring", "summer"]
    },
    {
      id: 2,
      title: "Glass Jar Lanterns",
      description: "Create beautiful ambient lighting using old glass jars and LED string lights.",
      image: "https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?w=400&h=300&fit=crop",
      category: "glass",
      difficulty: "beginner",
      timeRequired: "1 hour",
      environmentalImpact: "Medium",
      materials: ["Glass jars", "LED string lights", "Wire", "Decorative stones"],
      tools: ["Wire cutters", "Pliers"],
      instructions: [
        "Clean glass jars and remove any labels",
        "Create a wire handle by wrapping around the jar rim",
        "Insert LED string lights into the jar",
        "Add decorative stones for weight and aesthetics",
        "Test the lights and adjust positioning",
        "Hang or place in desired location"
      ],
      seasonal: ["fall", "winter"]
    },
    {
      id: 3,
      title: "T-Shirt Tote Bag",
      description: "Convert old t-shirts into reusable shopping bags without any sewing required.",
      image: "https://images.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg?w=400&h=300&fit=crop",
      category: "fabric",
      difficulty: "beginner",
      timeRequired: "30 minutes",
      environmentalImpact: "High",
      materials: ["Old t-shirt"],
      tools: ["Scissors", "Ruler"],
      instructions: [
        "Lay t-shirt flat and cut off sleeves",
        "Cut neckline to create bag opening",
        "Cut fringe strips along the bottom hem",
        "Tie fringe strips together to close the bottom",
        "Stretch handles to desired length",
        "Your reusable bag is ready to use!"
      ],
      seasonal: ["all"]
    },
    {
      id: 4,
      title: "Electronic Component Art",
      description: "Create stunning wall art using old circuit boards and electronic components.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      category: "electronics",
      difficulty: "advanced",
      timeRequired: "4 hours",
      environmentalImpact: "Medium",
      materials: ["Old circuit boards", "Electronic components", "Canvas", "Adhesive"],
      tools: ["Soldering iron", "Hot glue gun", "Tweezers"],
      instructions: [
        "Disassemble old electronics carefully",
        "Sort components by size and color",
        "Plan your design on canvas",
        "Arrange components in artistic patterns",
        "Secure components with appropriate adhesive",
        "Add finishing touches and frame if desired"
      ],
      seasonal: ["all"]
    },
    {
      id: 5,
      title: "Paper Seed Pots",
      description: "Make biodegradable seed starting pots from old newspapers and magazines.",
      image: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?w=400&h=300&fit=crop",
      category: "paper",
      difficulty: "beginner",
      timeRequired: "45 minutes",
      environmentalImpact: "High",
      materials: ["Newspapers", "Magazines", "Water", "Seeds"],
      tools: ["Pot mold", "Brush"],
      instructions: [
        "Tear paper into small strips",
        "Soak strips in water for 30 minutes",
        "Mold wet paper around pot form",
        "Press out excess water and let dry",
        "Fill with soil and plant seeds",
        "Plant entire pot in garden when ready"
      ],
      seasonal: ["spring"]
    },
    {
      id: 6,
      title: "Metal Can Planters",
      description: "Transform tin cans into decorative planters with drainage and style.",
      image: "https://images.pixabay.com/photo/2016/11/29/05/07/plants-1867417_1280.jpg?w=400&h=300&fit=crop",
      category: "metal",
      difficulty: "intermediate",
      timeRequired: "2 hours",
      environmentalImpact: "Medium",
      materials: ["Tin cans", "Paint", "Gravel", "Potting soil"],
      tools: ["Drill", "Sandpaper", "Paintbrush"],
      instructions: [
        "Remove labels and clean cans thoroughly",
        "Sand rough edges smooth",
        "Drill drainage holes in bottom",
        "Apply primer and decorative paint",
        "Add gravel layer for drainage",
        "Fill with soil and plant your favorites"
      ],
      seasonal: ["spring", "summer"]
    },
    {
      id: 7,
      title: "Wooden Pallet Coffee Table",
      description: "Build a rustic coffee table using reclaimed wooden pallets.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "wood",
      difficulty: "advanced",
      timeRequired: "6 hours",
      environmentalImpact: "High",
      materials: ["Wooden pallets", "Wood stain", "Casters", "Screws"],
      tools: ["Saw", "Sander", "Drill", "Screwdriver"],
      instructions: [
        "Disassemble pallets and select best boards",
        "Sand all pieces to remove splinters",
        "Cut boards to desired table dimensions",
        "Assemble table frame with screws",
        "Apply wood stain and protective finish",
        "Attach casters for mobility"
      ],
      seasonal: ["all"]
    },
    {
      id: 8,
      title: "Plastic Container Organizers",
      description: "Create custom drawer organizers using various plastic containers.",
      image: "https://images.pexels.com/photos/6195122/pexels-photo-6195122.jpeg?w=400&h=300&fit=crop",
      category: "plastic",
      difficulty: "beginner",
      timeRequired: "1 hour",
      environmentalImpact: "Medium",
      materials: ["Plastic containers", "Velcro strips", "Labels"],
      tools: ["Scissors", "Ruler", "Label maker"],
      instructions: [
        "Clean containers and remove labels",
        "Measure drawer dimensions",
        "Arrange containers to fit space",
        "Attach velcro strips to prevent sliding",
        "Label each container for contents",
        "Organize items by category"
      ],
      seasonal: ["all"]
    }
  ];

  // Categories with counts
  const categories = useMemo(() => {
    const categoryCounts = reuseIdeas.reduce((acc, idea) => {
      acc[idea.category] = (acc[idea.category] || 0) + 1;
      return acc;
    }, {});

    return [
      { id: 'all', name: 'All Ideas', count: reuseIdeas.length },
      { id: 'plastic', name: 'Plastic', count: categoryCounts.plastic || 0 },
      { id: 'glass', name: 'Glass', count: categoryCounts.glass || 0 },
      { id: 'fabric', name: 'Fabric', count: categoryCounts.fabric || 0 },
      { id: 'electronics', name: 'Electronics', count: categoryCounts.electronics || 0 },
      { id: 'paper', name: 'Paper', count: categoryCounts.paper || 0 },
      { id: 'metal', name: 'Metal', count: categoryCounts.metal || 0 },
      { id: 'wood', name: 'Wood', count: categoryCounts.wood || 0 }
    ];
  }, [reuseIdeas]);

  // Filtered ideas based on search, category, and filters
  const filteredIdeas = useMemo(() => {
    return reuseIdeas.filter(idea => {
      // Search filter
      const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           idea.materials.some(material => material.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory = activeCategory === 'all' || idea.category === activeCategory;

      // Difficulty filter
      const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(idea.difficulty);

      // Time range filter
      const matchesTimeRange = filters.timeRange.length === 0 || filters.timeRange.some(range => {
        const timeHours = parseInt(idea.timeRequired);
        switch (range) {
          case 'quick':
            return timeHours < 1;
          case 'moderate':
            return timeHours >= 1 && timeHours <= 3;
          case 'extended':
            return timeHours > 3;
          default:
            return true;
        }
      });

      // Seasonal filter
      const matchesSeasonal = filters.seasonal.length === 0 || 
                             filters.seasonal.some(season => idea.seasonal.includes(season)) ||
                             idea.seasonal.includes('all');

      return matchesSearch && matchesCategory && matchesDifficulty && matchesTimeRange && matchesSeasonal;
    });
  }, [reuseIdeas, searchTerm, activeCategory, filters]);

  const handleBookmark = (ideaId) => {
    setBookmarkedIdeas(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(ideaId)) {
        newBookmarks.delete(ideaId);
      } else {
        newBookmarks.add(ideaId);
      }
      return newBookmarks;
    });
  };

  const handleClearFilters = () => {
    setFilters({
      difficulty: [],
      timeRange: [],
      seasonal: []
    });
  };

  const handleAddIdea = () => {
    // Mock function for adding new ideas
    alert('Add Idea functionality would open a form to submit new reuse ideas!');
  };

  return (
    <>
      <Helmet>
        <title>Reuse Ideas Gallery - EcoHub</title>
        <meta name="description" content="Discover creative recycling and upcycling solutions organized by material categories. Find step-by-step instructions for sustainable DIY projects." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <NavigationBar />
        
        {/* Main Content */}
        <main className="pt-16">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Reuse Ideas Gallery
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover creative ways to give new life to everyday items. From beginner-friendly crafts to advanced upcycling projects.
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onFilterToggle={() => setIsFilterPanelOpen(true)}
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="sticky top-16 bg-background/95 backdrop-blur-sm border-b border-border z-20">
            <div className="py-4">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Grid3X3" size={16} />
                <span>
                  {filteredIdeas.length} {filteredIdeas.length === 1 ? 'idea' : 'ideas'} found
                </span>
                {(searchTerm || activeCategory !== 'all' || Object.values(filters).some(f => f.length > 0)) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                      handleClearFilters();
                    }}
                    className="text-primary hover:text-primary/80 eco-transition"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Ideas Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            {filteredIdeas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIdeas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    onBookmark={handleBookmark}
                    onViewDetails={setSelectedIdea}
                    isBookmarked={bookmarkedIdeas.has(idea.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No ideas found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or filters to find more reuse ideas.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                    handleClearFilters();
                  }}
                  className="text-primary hover:text-primary/80 eco-transition"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Idea Detail Modal */}
        <IdeaDetailModal
          idea={selectedIdea}
          isOpen={!!selectedIdea}
          onClose={() => setSelectedIdea(null)}
          onBookmark={handleBookmark}
          isBookmarked={selectedIdea ? bookmarkedIdeas.has(selectedIdea.id) : false}
        />

        {/* Add Idea FAB */}
        <AddIdeaFAB onClick={handleAddIdea} />
      </div>
    </>
  );
};

export default ReuseIdeasGallery;