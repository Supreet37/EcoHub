import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DailyTipPreview = () => {
  const navigate = useNavigate();
  const [isShared, setIsShared] = useState(false);

  const todaysTip = {
    id: 1,
    title: "Switch to LED Light Bulbs",
    category: "Energy Saving",
    content: `LED bulbs use up to 80% less energy than traditional incandescent bulbs and last 25 times longer. By replacing just 5 frequently used light bulbs in your home, you can save $45 per year on electricity bills.\n\nBonus tip: Look for ENERGY STAR certified LEDs for maximum efficiency and quality assurance.`,
    impact: "Save 1,000 kWh annually",
    difficulty: "Easy",
    timeToImplement: "15 minutes",
    costSaving: "$45/year",
    carbonReduction: "450 kg CO₂/year",
    icon: "Lightbulb",
    color: "accent"
  };

  const handleShare = () => {
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
    
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: `EcoHub Tip: ${todaysTip.title}`,
        text: todaysTip.content.split('\n')[0],
        url: window.location.href
      });
    }
  };

  const colorClasses = {
    accent: 'text-accent bg-accent/10 border-accent/20'
  };

  const iconColorClasses = {
    accent: 'text-accent'
  };

  return (
    <div className="bg-card rounded-xl border border-border eco-shadow-card p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Today's Green Tip
          </h2>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${colorClasses[todaysTip.color]}`}>
          <Icon name={todaysTip.icon} size={24} className={iconColorClasses[todaysTip.color]} />
        </div>
      </div>

      <div className="space-y-4">
        {/* Category Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Icon name="Tag" size={14} className="mr-1" />
          {todaysTip.category}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground">
          {todaysTip.title}
        </h3>

        {/* Content */}
        <div className="text-muted-foreground leading-relaxed">
          {todaysTip.content.split('\n').map((paragraph, index) => (
            <p key={index} className={index > 0 ? 'mt-3' : ''}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Difficulty</div>
            <div className="font-semibold text-success">{todaysTip.difficulty}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Time</div>
            <div className="font-semibold text-foreground">{todaysTip.timeToImplement}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Savings</div>
            <div className="font-semibold text-accent">{todaysTip.costSaving}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">CO₂ Reduced</div>
            <div className="font-semibold text-success">{todaysTip.carbonReduction}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="default"
            iconName="BookOpen"
            iconPosition="left"
            onClick={() => navigate('/daily-green-tips')}
            className="flex-1"
          >
            View All Tips
          </Button>
          <Button
            variant="outline"
            iconName={isShared ? "Check" : "Share"}
            iconPosition="left"
            onClick={handleShare}
            disabled={isShared}
            className="flex-1 sm:flex-none"
          >
            {isShared ? "Shared!" : "Share Tip"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyTipPreview;