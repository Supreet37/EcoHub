import React from 'react';
import Icon from '../../../components/AppIcon';

const ChallengeTabNavigation = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    {
      id: 'active',
      label: 'Active',
      icon: 'Play',
      count: counts.active
    },
    {
      id: 'available',
      label: 'Available',
      icon: 'Search',
      count: counts.available
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: 'CheckCircle',
      count: counts.completed
    }
  ];

  return (
    <div className="border-b border-border mb-6">
      <nav className="flex space-x-8" aria-label="Challenge tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm eco-transition ${
              activeTab === tab.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.id
                ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ChallengeTabNavigation;