import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import ProgressIndicator from './components/ProgressIndicator';
import TransportationSection from './components/TransportationSection';
import EnergySection from './components/EnergySection';
import LifestyleSection from './components/LifestyleSection';
import ResultsPanel from './components/ResultsPanel';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CarbonFootprintCalculator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('transportation');
  const [completedSections, setCompletedSections] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    transportation: true,
    energy: false,
    lifestyle: false
  });

  const [formData, setFormData] = useState({
    transportation: {
      vehicleType: '',
      weeklyMileage: '',
      fuelEfficiency: '',
      publicTransit: '',
      flightHours: ''
    },
    energy: {
      homeSize: '',
      electricityBill: '',
      heatingSource: '',
      gasBill: '',
      energySource: '',
      occupants: ''
    },
    lifestyle: {
      dietType: '',
      meatConsumption: '',
      shoppingFrequency: '',
      wasteGeneration: '',
      recycling: false,
      composting: false,
      localOrganic: false,
      reusableItems: false
    }
  });

  const [calculationResults, setCalculationResults] = useState({
    transportation: 0,
    energy: 0,
    lifestyle: 0,
    total: 0
  });

  // Calculate carbon footprint
  const calculateFootprint = () => {
    const { transportation, energy, lifestyle } = formData;
    
    // Transportation calculations
    let transportationFootprint = 0;
    if (transportation.vehicleType && transportation.vehicleType !== 'none') {
      const weeklyMiles = parseFloat(transportation.weeklyMileage) || 0;
      const mpg = parseFloat(transportation.fuelEfficiency) || 25;
      const annualMiles = weeklyMiles * 52;
      const gallonsPerYear = annualMiles / mpg;
      
      // CO2 per gallon of gasoline: ~19.6 lbs, convert to tons
      let emissionFactor = 19.6 / 2000;
      
      // Adjust for vehicle type
      const vehicleMultipliers = {
        compact: 0.8,
        sedan: 1.0,
        suv: 1.4,
        hybrid: 0.5,
        electric: 0.1
      };
      emissionFactor *= vehicleMultipliers[transportation.vehicleType] || 1.0;
      
      transportationFootprint += gallonsPerYear * emissionFactor;
    }

    // Public transit reduction
    const transitReductions = {
      never: 0,
      rarely: 0.1,
      sometimes: 0.3,
      often: 0.5,
      daily: 0.8
    };
    const transitReduction = transitReductions[transportation.publicTransit] || 0;
    transportationFootprint *= (1 - transitReduction * 0.3);

    // Flight emissions
    const flightHours = parseFloat(transportation.flightHours) || 0;
    transportationFootprint += flightHours * 0.25; // ~0.25 tons CO2 per flight hour

    // Energy calculations
    let energyFootprint = 0;
    const electricityBill = parseFloat(energy.electricityBill) || 0;
    const gasBill = parseFloat(energy.gasBill) || 0;
    const occupants = parseFloat(energy.occupants) || 1;

    // Electricity: ~0.92 lbs CO2 per kWh, ~$0.13 per kWh average
    const monthlyKWh = electricityBill / 0.13;
    const annualKWh = monthlyKWh * 12;
    energyFootprint += (annualKWh * 0.92) / 2000; // Convert to tons

    // Natural gas: ~11.7 lbs CO2 per therm, ~$1.00 per therm average
    const monthlyTherms = gasBill / 1.00;
    const annualTherms = monthlyTherms * 12;
    energyFootprint += (annualTherms * 11.7) / 2000; // Convert to tons

    // Adjust for home size
    const homeSizeMultipliers = {
      apartment: 0.7,
      small: 0.9,
      medium: 1.0,
      large: 1.3,
      mansion: 1.8
    };
    energyFootprint *= homeSizeMultipliers[energy.homeSize] || 1.0;

    // Adjust for energy source
    const energySourceMultipliers = {
      grid: 1.0,
      renewable: 0.3,
      solar: 0.1,
      mixed: 0.6
    };
    energyFootprint *= energySourceMultipliers[energy.energySource] || 1.0;

    // Divide by occupants
    energyFootprint /= occupants;

    // Lifestyle calculations
    let lifestyleFootprint = 0;
    
    // Diet impact
    const dietMultipliers = {
      omnivore: 2.5,
      pescatarian: 1.8,
      vegetarian: 1.2,
      vegan: 0.8
    };
    const baseDietFootprint = dietMultipliers[lifestyle.dietType] || 2.5;
    
    // Adjust for meat consumption
    const meatMeals = parseFloat(lifestyle.meatConsumption) || 7;
    const meatAdjustment = meatMeals / 7; // Normalize to weekly average
    lifestyleFootprint += baseDietFootprint * meatAdjustment;

    // Shopping impact
    const shoppingMultipliers = {
      minimal: 0.5,
      occasional: 1.0,
      regular: 1.5,
      frequent: 2.5
    };
    lifestyleFootprint += shoppingMultipliers[lifestyle.shoppingFrequency] || 1.0;

    // Waste impact
    const wasteMultipliers = {
      minimal: 0.3,
      average: 0.6,
      'above-average': 0.9,
      high: 1.2
    };
    lifestyleFootprint += wasteMultipliers[lifestyle.wasteGeneration] || 0.6;

    // Sustainable practices reduction
    let sustainabilityReduction = 0;
    if (lifestyle.recycling) sustainabilityReduction += 0.1;
    if (lifestyle.composting) sustainabilityReduction += 0.1;
    if (lifestyle.localOrganic) sustainabilityReduction += 0.15;
    if (lifestyle.reusableItems) sustainabilityReduction += 0.05;
    
    lifestyleFootprint *= (1 - sustainabilityReduction);

    const total = transportationFootprint + energyFootprint + lifestyleFootprint;

    setCalculationResults({
      transportation: transportationFootprint,
      energy: energyFootprint,
      lifestyle: lifestyleFootprint,
      total: total
    });
  };

  // Check if section is completed
  const isSectionCompleted = (section) => {
    const data = formData[section];
    switch (section) {
      case 'transportation':
        return data.vehicleType && data.publicTransit;
      case 'energy':
        return data.homeSize && data.electricityBill && data.heatingSource;
      case 'lifestyle':
        return data.dietType && data.shoppingFrequency && data.wasteGeneration;
      default:
        return false;
    }
  };

  // Update completed sections
  useEffect(() => {
    const completed = [];
    ['transportation', 'energy', 'lifestyle'].forEach(section => {
      if (isSectionCompleted(section)) {
        completed.push(section);
      }
    });
    setCompletedSections(completed);
  }, [formData]);

  // Recalculate when form data changes
  useEffect(() => {
    calculateFootprint();
  }, [formData]);

  const handleSectionChange = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    setCurrentStep(section);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Carbon Footprint Results',
        text: `I calculated my carbon footprint: ${calculationResults.total.toFixed(1)} tons CO₂/year. Calculate yours with EcoHub!`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      const shareText = `My carbon footprint: ${calculationResults.total.toFixed(1)} tons CO₂/year. Calculate yours at ${window.location.href}`;
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  };

  const handleStartChallenges = () => {
    navigate('/eco-challenges-hub');
  };

  const resetCalculator = () => {
    setFormData({
      transportation: {
        vehicleType: '',
        weeklyMileage: '',
        fuelEfficiency: '',
        publicTransit: '',
        flightHours: ''
      },
      energy: {
        homeSize: '',
        electricityBill: '',
        heatingSource: '',
        gasBill: '',
        energySource: '',
        occupants: ''
      },
      lifestyle: {
        dietType: '',
        meatConsumption: '',
        shoppingFrequency: '',
        wasteGeneration: '',
        recycling: false,
        composting: false,
        localOrganic: false,
        reusableItems: false
      }
    });
    setExpandedSections({
      transportation: true,
      energy: false,
      lifestyle: false
    });
    setCurrentStep('transportation');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Calculator" size={24} className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Carbon Footprint Calculator</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Assess your environmental impact and discover personalized ways to reduce your carbon footprint
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <ProgressIndicator 
                currentStep={currentStep}
                totalSteps={3}
                completedSections={completedSections}
              />

              <div className="space-y-4">
                <TransportationSection
                  data={formData.transportation}
                  onChange={handleSectionChange}
                  isExpanded={expandedSections.transportation}
                  onToggle={() => toggleSection('transportation')}
                />

                <EnergySection
                  data={formData.energy}
                  onChange={handleSectionChange}
                  isExpanded={expandedSections.energy}
                  onToggle={() => toggleSection('energy')}
                />

                <LifestyleSection
                  data={formData.lifestyle}
                  onChange={handleSectionChange}
                  isExpanded={expandedSections.lifestyle}
                  onToggle={() => toggleSection('lifestyle')}
                />
              </div>

              {/* Reset Button */}
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  iconName="RotateCcw" 
                  iconPosition="left"
                  onClick={resetCalculator}
                >
                  Reset Calculator
                </Button>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ResultsPanel
                  calculationData={calculationResults}
                  totalFootprint={calculationResults.total}
                  onShare={handleShare}
                  onStartChallenges={handleStartChallenges}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-card rounded-lg p-6 eco-shadow-card">
            <div className="text-center">
              <Icon name="Info" size={24} className="text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">About This Calculator</h3>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                This calculator provides estimates based on average emission factors and lifestyle patterns. 
                Results may vary based on your specific circumstances, location, and energy sources. 
                Use these results as a starting point for understanding and reducing your environmental impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;