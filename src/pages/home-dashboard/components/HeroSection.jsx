import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary"></div>
        <div className="absolute top-32 right-16 w-16 h-16 rounded-full bg-secondary"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full bg-accent"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 rounded-full bg-success"></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Build a{' '}
            <span className="text-primary">Sustainable</span>{' '}
            Future
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Take control of your environmental impact with our comprehensive suite of tools. 
            Calculate your carbon footprint, discover creative reuse ideas, and join challenges 
            that make a real difference for our planet.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Users" size={24} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">50K+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Leaf" size={24} className="text-success" />
            </div>
            <div className="text-2xl font-bold text-foreground">2.5M</div>
            <div className="text-sm text-muted-foreground">CO₂ Saved (kg)</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Recycle" size={24} className="text-secondary" />
            </div>
            <div className="text-2xl font-bold text-foreground">15K</div>
            <div className="text-sm text-muted-foreground">Items Reused</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Target" size={24} className="text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground">1.2K</div>
            <div className="text-sm text-muted-foreground">Challenges Completed</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="default"
            size="lg"
            iconName="Calculator"
            iconPosition="left"
            onClick={() => navigate('/carbon-footprint-calculator')}
            className="w-full sm:w-auto"
          >
            Calculate Your Impact
          </Button>
          <Button
            variant="outline"
            size="lg"
            iconName="Lightbulb"
            iconPosition="left"
            onClick={() => navigate('/reuse-ideas-gallery')}
            className="w-full sm:w-auto"
          >
            Explore Ideas
          </Button>
        </div>

        {/* Environmental Message */}
        <div className="mt-8 p-4 bg-success/10 rounded-lg border border-success/20 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-success">
            <Icon name="Heart" size={20} />
            <span className="font-medium">
              Every small action contributes to a healthier planet
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;