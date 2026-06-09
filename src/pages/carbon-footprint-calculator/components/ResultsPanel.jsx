import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResultsPanel = ({ calculationData, totalFootprint, onShare, onStartChallenges }) => {
  const nationalAverage = 16.0; // US average tons CO2/year
  const globalAverage = 4.8; // Global average tons CO2/year

  const categoryData = [
    { name: 'Transportation', value: calculationData.transportation || 0, color: '#2D5A3D' },
    { name: 'Energy', value: calculationData.energy || 0, color: '#7B9B7E' },
    { name: 'Lifestyle', value: calculationData.lifestyle || 0, color: '#E8A547' }
  ];

  const comparisonData = [
    { name: 'Your Footprint', value: totalFootprint },
    { name: 'US Average', value: nationalAverage },
    { name: 'Global Average', value: globalAverage }
  ];

  const getFootprintLevel = () => {
    if (totalFootprint < globalAverage) return { level: 'Excellent', color: 'text-success', icon: 'Leaf' };
    if (totalFootprint < nationalAverage * 0.75) return { level: 'Good', color: 'text-primary', icon: 'ThumbsUp' };
    if (totalFootprint < nationalAverage) return { level: 'Average', color: 'text-warning', icon: 'Minus' };
    return { level: 'High', color: 'text-error', icon: 'AlertTriangle' };
  };

  const footprintLevel = getFootprintLevel();

  const recommendations = [
    {
      category: 'Transportation',
      tip: 'Consider carpooling, public transport, or electric vehicles',
      impact: 'Up to 2.3 tons CO₂ reduction/year'
    },
    {
      category: 'Energy',
      tip: 'Switch to renewable energy and improve home efficiency',
      impact: 'Up to 3.5 tons CO₂ reduction/year'
    },
    {
      category: 'Lifestyle',
      tip: 'Reduce meat consumption and increase recycling',
      impact: 'Up to 1.8 tons CO₂ reduction/year'
    }
  ];

  if (totalFootprint === 0) {
    return (
      <div className="bg-card rounded-lg p-6 eco-shadow-card">
        <div className="text-center">
          <Icon name="Calculator" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Complete Your Assessment</h3>
          <p className="text-muted-foreground">
            Fill out the sections on the left to calculate your carbon footprint and get personalized recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className="bg-card rounded-lg p-6 eco-shadow-card">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name={footprintLevel.icon} size={24} className={footprintLevel.color} />
            <span className={`text-lg font-semibold ${footprintLevel.color}`}>
              {footprintLevel.level}
            </span>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">
            {totalFootprint.toFixed(1)} <span className="text-lg font-normal">tons CO₂/year</span>
          </div>
          <p className="text-muted-foreground">Your estimated annual carbon footprint</p>
        </div>

        {/* Comparison Chart */}
        <div className="h-64 mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Comparison with Averages</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [`${value.toFixed(1)} tons CO₂`, 'Annual Footprint']}
                labelStyle={{ color: 'var(--color-foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-popover)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="default" 
            iconName="Target" 
            iconPosition="left"
            onClick={onStartChallenges}
            className="flex-1"
          >
            Start Eco Challenges
          </Button>
          <Button 
            variant="outline" 
            iconName="Share2" 
            iconPosition="left"
            onClick={onShare}
            className="flex-1"
          >
            Share Results
          </Button>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-card rounded-lg p-6 eco-shadow-card">
        <h4 className="text-lg font-semibold text-foreground mb-4">Footprint Breakdown</h4>
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value.toFixed(1)} tons CO₂`, 'Annual Emissions']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-2">
          {categoryData.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-foreground">{category.name}</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {category.value.toFixed(1)} tons CO₂
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-card rounded-lg p-6 eco-shadow-card">
        <h4 className="text-lg font-semibold text-foreground mb-4">Personalized Recommendations</h4>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Lightbulb" size={16} className="text-success" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-1">{rec.category}</h5>
                  <p className="text-sm text-muted-foreground mb-2">{rec.tip}</p>
                  <span className="text-xs font-medium text-success">{rec.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;