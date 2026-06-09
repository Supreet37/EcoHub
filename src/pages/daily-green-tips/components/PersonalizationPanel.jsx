import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PersonalizationPanel = ({ isOpen, onClose, preferences, onSavePreferences }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const categoryOptions = [
    { value: 'energy', label: 'Energy Saving' },
    { value: 'waste', label: 'Waste Reduction' },
    { value: 'transport', label: 'Sustainable Transportation' },
    { value: 'shopping', label: 'Eco-Friendly Shopping' },
    { value: 'water', label: 'Water Conservation' },
    { value: 'living', label: 'Sustainable Living' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
    { value: 'all', label: 'All Levels' }
  ];

  const handleSave = () => {
    onSavePreferences(localPreferences);
    onClose();
  };

  const handleCategoryChange = (categoryValue, checked) => {
    setLocalPreferences(prev => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryValue]
        : prev.categories.filter(cat => cat !== categoryValue)
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[1050]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-background border-l border-border z-[1100] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Personalize Tips</h2>
              <p className="text-sm text-muted-foreground">Customize your daily green tips experience</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Preferred Categories */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Preferred Categories
              </h3>
              <div className="space-y-3">
                {categoryOptions.map((category) => (
                  <Checkbox
                    key={category.value}
                    label={category.label}
                    checked={localPreferences.categories.includes(category.value)}
                    onChange={(e) => handleCategoryChange(category.value, e.target.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Notification Frequency */}
            <div>
              <Select
                label="Notification Frequency"
                description="How often would you like to receive new tips?"
                options={frequencyOptions}
                value={localPreferences.frequency}
                onChange={(value) => setLocalPreferences(prev => ({ ...prev, frequency: value }))}
              />
            </div>

            {/* Difficulty Level */}
            <div>
              <Select
                label="Difficulty Level"
                description="Choose the complexity of tips you prefer"
                options={difficultyOptions}
                value={localPreferences.difficulty}
                onChange={(value) => setLocalPreferences(prev => ({ ...prev, difficulty: value }))}
              />
            </div>

            {/* Additional Preferences */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Additional Preferences
              </h3>
              <div className="space-y-3">
                <Checkbox
                  label="Show seasonal tips"
                  description="Display tips relevant to current season"
                  checked={localPreferences.seasonalTips}
                  onChange={(e) => setLocalPreferences(prev => ({ 
                    ...prev, 
                    seasonalTips: e.target.checked 
                  }))}
                />
                <Checkbox
                  label="Include challenge-related tips"
                  description="Show tips related to your active eco-challenges"
                  checked={localPreferences.challengeRelated}
                  onChange={(e) => setLocalPreferences(prev => ({ 
                    ...prev, 
                    challengeRelated: e.target.checked 
                  }))}
                />
                <Checkbox
                  label="Email notifications"
                  description="Receive daily tips via email"
                  checked={localPreferences.emailNotifications}
                  onChange={(e) => setLocalPreferences(prev => ({ 
                    ...prev, 
                    emailNotifications: e.target.checked 
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 pt-6 border-t border-border">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
              fullWidth
            >
              Save Preferences
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalizationPanel;