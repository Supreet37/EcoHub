import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EnvironmentalStats = () => {
  const [counters, setCounters] = useState({
    carbonSaved: 0,
    treesPlanted: 0,
    wasteReduced: 0,
    energySaved: 0
  });

  const targetValues = {
    carbonSaved: 2547,
    treesPlanted: 12890,
    wasteReduced: 8456,
    energySaved: 15670
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(targetValues).map(key => {
      const target = targetValues[key];
      const increment = target / steps;
      let current = 0;
      let step = 0;

      return setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), target);
        
        setCounters(prev => ({
          ...prev,
          [key]: current
        }));

        if (step >= steps) {
          clearInterval(intervals.find(interval => interval === this));
        }
      }, stepDuration);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  const stats = [
    {
      key: 'carbonSaved',
      label: 'CO₂ Reduced',
      value: counters.carbonSaved,
      unit: 'kg',
      icon: 'Leaf',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      key: 'treesPlanted',
      label: 'Trees Equivalent',
      value: counters.treesPlanted,
      unit: 'trees',
      icon: 'TreePine',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      key: 'wasteReduced',
      label: 'Waste Diverted',
      value: counters.wasteReduced,
      unit: 'kg',
      icon: 'Recycle',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      key: 'energySaved',
      label: 'Energy Conserved',
      value: counters.energySaved,
      unit: 'kWh',
      icon: 'Zap',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="bg-card rounded-xl border border-border eco-shadow-card p-6 lg:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          Global Environmental Impact
        </h2>
        <p className="text-muted-foreground">
          Real-time statistics from our community's collective efforts
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.key} className="text-center">
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bgColor} mb-4`}>
              <Icon name={stat.icon} size={28} className={stat.color} />
            </div>

            {/* Value */}
            <div className="mb-2">
              <div className="text-2xl lg:text-3xl font-bold text-foreground">
                {formatNumber(stat.value)}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.unit}
              </div>
            </div>

            {/* Label */}
            <div className="text-sm font-medium text-foreground">
              {stat.label}
            </div>

            {/* Progress Bar */}
            <div className="mt-3 w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${stat.color.replace('text-', 'bg-')}`}
                style={{ 
                  width: `${Math.min((stat.value / targetValues[stat.key]) * 100, 100)}%` 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span>Updated in real-time</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Globe" size={16} className="text-primary" />
            <span>Global community impact</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalStats;