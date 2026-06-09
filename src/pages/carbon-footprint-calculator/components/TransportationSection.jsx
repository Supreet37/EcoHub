import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TransportationSection = ({ data, onChange, isExpanded, onToggle }) => {
  const vehicleOptions = [
    { value: 'none', label: 'No Vehicle' },
    { value: 'compact', label: 'Compact Car' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV/Truck' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'electric', label: 'Electric Vehicle' }
  ];

  const publicTransitOptions = [
    { value: 'never', label: 'Never' },
    { value: 'rarely', label: 'Rarely (1-2 times/month)' },
    { value: 'sometimes', label: 'Sometimes (1-2 times/week)' },
    { value: 'often', label: 'Often (3-4 times/week)' },
    { value: 'daily', label: 'Daily' }
  ];

  const handleInputChange = (field, value) => {
    onChange('transportation', { ...data, [field]: value });
  };

  return (
    <div className="bg-card rounded-lg eco-shadow-card mb-4">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-muted eco-transition"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Car" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Transportation</h3>
            <p className="text-sm text-muted-foreground">Vehicle usage and commuting habits</p>
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
            label="Primary Vehicle Type"
            description="Select your main mode of transportation"
            options={vehicleOptions}
            value={data.vehicleType}
            onChange={(value) => handleInputChange('vehicleType', value)}
            className="mb-4"
          />

          {data.vehicleType && data.vehicleType !== 'none' && (
            <>
              <Input
                label="Weekly Mileage"
                type="number"
                placeholder="Enter miles driven per week"
                description="Average miles you drive per week"
                value={data.weeklyMileage}
                onChange={(e) => handleInputChange('weeklyMileage', e.target.value)}
                min="0"
                className="mb-4"
              />

              <Input
                label="Fuel Efficiency (MPG)"
                type="number"
                placeholder="Enter your vehicle's MPG"
                description="Your vehicle's miles per gallon rating"
                value={data.fuelEfficiency}
                onChange={(e) => handleInputChange('fuelEfficiency', e.target.value)}
                min="1"
                className="mb-4"
              />
            </>
          )}

          <Select
            label="Public Transportation Usage"
            description="How often do you use public transportation?"
            options={publicTransitOptions}
            value={data.publicTransit}
            onChange={(value) => handleInputChange('publicTransit', value)}
            className="mb-4"
          />

          <Input
            label="Flight Hours per Year"
            type="number"
            placeholder="Enter total flight hours annually"
            description="Total hours spent flying per year (round trip)"
            value={data.flightHours}
            onChange={(e) => handleInputChange('flightHours', e.target.value)}
            min="0"
            className="mb-4"
          />

          <div className="bg-accent/10 rounded-lg p-3 mt-4">
            <div className="flex items-start space-x-2">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-accent">Tip:</p>
                <p className="text-muted-foreground">
                  Consider carpooling, using public transport, or switching to an electric vehicle to reduce your transportation footprint.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportationSection;