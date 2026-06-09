import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const EnergySection = ({ data, onChange, isExpanded, onToggle }) => {
  const homeSizeOptions = [
    { value: 'apartment', label: 'Apartment (< 1000 sq ft)' },
    { value: 'small', label: 'Small House (1000-1500 sq ft)' },
    { value: 'medium', label: 'Medium House (1500-2500 sq ft)' },
    { value: 'large', label: 'Large House (2500-4000 sq ft)' },
    { value: 'mansion', label: 'Mansion (> 4000 sq ft)' }
  ];

  const heatingOptions = [
    { value: 'gas', label: 'Natural Gas' },
    { value: 'electric', label: 'Electric' },
    { value: 'oil', label: 'Heating Oil' },
    { value: 'solar', label: 'Solar' },
    { value: 'geothermal', label: 'Geothermal' },
    { value: 'wood', label: 'Wood/Biomass' }
  ];

  const energySourceOptions = [
    { value: 'grid', label: 'Standard Grid' },
    { value: 'renewable', label: 'Renewable Energy Plan' },
    { value: 'solar', label: 'Solar Panels' },
    { value: 'mixed', label: 'Mixed Sources' }
  ];

  const handleInputChange = (field, value) => {
    onChange('energy', { ...data, [field]: value });
  };

  return (
    <div className="bg-card rounded-lg eco-shadow-card mb-4">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-muted eco-transition"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Energy Usage</h3>
            <p className="text-sm text-muted-foreground">Home energy consumption and sources</p>
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
            label="Home Size"
            description="Select your home size category"
            options={homeSizeOptions}
            value={data.homeSize}
            onChange={(value) => handleInputChange('homeSize', value)}
            className="mb-4"
          />

          <Input
            label="Monthly Electricity Bill ($)"
            type="number"
            placeholder="Enter your average monthly electricity bill"
            description="Average monthly electricity cost in USD"
            value={data.electricityBill}
            onChange={(e) => handleInputChange('electricityBill', e.target.value)}
            min="0"
            className="mb-4"
          />

          <Select
            label="Primary Heating Source"
            description="What is your main heating source?"
            options={heatingOptions}
            value={data.heatingSource}
            onChange={(value) => handleInputChange('heatingSource', value)}
            className="mb-4"
          />

          <Input
            label="Monthly Gas Bill ($)"
            type="number"
            placeholder="Enter your average monthly gas bill"
            description="Average monthly natural gas cost in USD"
            value={data.gasBill}
            onChange={(e) => handleInputChange('gasBill', e.target.value)}
            min="0"
            className="mb-4"
          />

          <Select
            label="Energy Source"
            description="What type of energy plan do you use?"
            options={energySourceOptions}
            value={data.energySource}
            onChange={(value) => handleInputChange('energySource', value)}
            className="mb-4"
          />

          <Input
            label="Number of Occupants"
            type="number"
            placeholder="Enter number of people in household"
            description="Total people living in your home"
            value={data.occupants}
            onChange={(e) => handleInputChange('occupants', e.target.value)}
            min="1"
            max="20"
            className="mb-4"
          />

          <div className="bg-success/10 rounded-lg p-3 mt-4">
            <div className="flex items-start space-x-2">
              <Icon name="Leaf" size={16} className="text-success mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-success">Eco Tip:</p>
                <p className="text-muted-foreground">
                  Switch to LED bulbs, use programmable thermostats, and consider renewable energy plans to reduce your energy footprint.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergySection;