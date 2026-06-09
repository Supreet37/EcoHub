import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LifestyleSection = ({ data, onChange, isExpanded, onToggle }) => {
  const dietOptions = [
    { value: 'omnivore', label: 'Omnivore (Meat & Vegetables)' },
    { value: 'pescatarian', label: 'Pescatarian (Fish & Vegetables)' },
    { value: 'vegetarian', label: 'Vegetarian (No Meat)' },
    { value: 'vegan', label: 'Vegan (Plant-based only)' }
  ];

  const shoppingFrequencyOptions = [
    { value: 'minimal', label: 'Minimal (Only necessities)' },
    { value: 'occasional', label: 'Occasional (Monthly)' },
    { value: 'regular', label: 'Regular (Weekly)' },
    { value: 'frequent', label: 'Frequent (Multiple times/week)' }
  ];

  const wasteOptions = [
    { value: 'minimal', label: 'Minimal (1-2 bags/week)' },
    { value: 'average', label: 'Average (3-4 bags/week)' },
    { value: 'above-average', label: 'Above Average (5-6 bags/week)' },
    { value: 'high', label: 'High (7+ bags/week)' }
  ];

  const handleInputChange = (field, value) => {
    onChange('lifestyle', { ...data, [field]: value });
  };

  const handleCheckboxChange = (field, checked) => {
    onChange('lifestyle', { ...data, [field]: checked });
  };

  return (
    <div className="bg-card rounded-lg eco-shadow-card mb-4">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-muted eco-transition"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Lifestyle Choices</h3>
            <p className="text-sm text-muted-foreground">Diet, shopping, and consumption habits</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          <Select
            label="Diet Type"
            description="What best describes your eating habits?"
            options={dietOptions}
            value={data.dietType}
            onChange={(value) => handleInputChange('dietType', value)}
            className="mb-4"
          />

          <Input
            label="Meat Consumption (meals/week)"
            type="number"
            placeholder="Enter meals with meat per week"
            description="Number of meals containing meat per week"
            value={data.meatConsumption}
            onChange={(e) => handleInputChange('meatConsumption', e.target.value)}
            min="0"
            max="21"
            className="mb-4"
          />

          <Select
            label="Shopping Frequency"
            description="How often do you buy non-essential items?"
            options={shoppingFrequencyOptions}
            value={data.shoppingFrequency}
            onChange={(value) => handleInputChange('shoppingFrequency', value)}
            className="mb-4"
          />

          <Select
            label="Waste Generation"
            description="How much household waste do you generate?"
            options={wasteOptions}
            value={data.wasteGeneration}
            onChange={(value) => handleInputChange('wasteGeneration', value)}
            className="mb-4"
          />

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Sustainable Practices</h4>
            
            <Checkbox
              label="I recycle regularly"
              description="Separate and recycle paper, plastic, glass, and metal"
              checked={data.recycling || false}
              onChange={(e) => handleCheckboxChange('recycling', e.target.checked)}
            />

            <Checkbox
              label="I compost organic waste"
              description="Compost food scraps and yard waste"
              checked={data.composting || false}
              onChange={(e) => handleCheckboxChange('composting', e.target.checked)}
            />

            <Checkbox
              label="I buy local/organic products"
              description="Prefer locally sourced and organic products"
              checked={data.localOrganic || false}
              onChange={(e) => handleCheckboxChange('localOrganic', e.target.checked)}
            />

            <Checkbox
              label="I use reusable bags and containers"
              description="Avoid single-use plastics when shopping"
              checked={data.reusableItems || false}
              onChange={(e) => handleCheckboxChange('reusableItems', e.target.checked)}
            />
          </div>

          <div className="bg-primary/10 rounded-lg p-3 mt-4">
            <div className="flex items-start space-x-2">
              <Icon name="Heart" size={16} className="text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-primary">Lifestyle Impact:</p>
                <p className="text-muted-foreground">
                  Small changes in diet, shopping habits, and waste management can significantly reduce your carbon footprint.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LifestyleSection;