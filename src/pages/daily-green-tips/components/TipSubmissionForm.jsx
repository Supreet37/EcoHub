import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TipSubmissionForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    actionSteps: [''],
    estimatedImpact: '',
    timeToImplement: ''
  });

  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: 'energy', label: 'Energy Saving' },
    { value: 'waste', label: 'Waste Reduction' },
    { value: 'transport', label: 'Sustainable Transportation' },
    { value: 'shopping', label: 'Eco-Friendly Shopping' },
    { value: 'water', label: 'Water Conservation' },
    { value: 'living', label: 'Sustainable Living' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleActionStepChange = (index, value) => {
    const newSteps = [...formData.actionSteps];
    newSteps[index] = value;
    setFormData(prev => ({ ...prev, actionSteps: newSteps }));
  };

  const addActionStep = () => {
    setFormData(prev => ({
      ...prev,
      actionSteps: [...prev.actionSteps, '']
    }));
  };

  const removeActionStep = (index) => {
    if (formData.actionSteps.length > 1) {
      const newSteps = formData.actionSteps.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, actionSteps: newSteps }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.difficulty) {
      newErrors.difficulty = 'Difficulty level is required';
    }
    if (formData.actionSteps.some(step => !step.trim())) {
      newErrors.actionSteps = 'All action steps must be filled';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        category: '',
        difficulty: '',
        actionSteps: [''],
        estimatedImpact: '',
        timeToImplement: ''
      });
      onClose();
    }
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

      {/* Modal */}
      <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
        <div className="bg-background rounded-lg border border-border eco-shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Submit a Green Tip</h2>
                <p className="text-sm text-muted-foreground">Share your sustainability knowledge with the community</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                iconName="X"
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Tip Title"
                type="text"
                placeholder="Enter a catchy title for your tip"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                error={errors.title}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Describe your tip in detail..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
                {errors.description && (
                  <p className="text-sm text-error mt-1">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Category"
                  options={categoryOptions}
                  value={formData.category}
                  onChange={(value) => handleInputChange('category', value)}
                  error={errors.category}
                  required
                />

                <Select
                  label="Difficulty Level"
                  options={difficultyOptions}
                  value={formData.difficulty}
                  onChange={(value) => handleInputChange('difficulty', value)}
                  error={errors.difficulty}
                  required
                />
              </div>

              {/* Action Steps */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-foreground">
                    Action Steps
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addActionStep}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Step
                  </Button>
                </div>
                <div className="space-y-3">
                  {formData.actionSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <Input
                        type="text"
                        placeholder={`Step ${index + 1}`}
                        value={step}
                        onChange={(e) => handleActionStepChange(index, e.target.value)}
                        className="flex-1"
                      />
                      {formData.actionSteps.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeActionStep(index)}
                          iconName="Trash2"
                        />
                      )}
                    </div>
                  ))}
                </div>
                {errors.actionSteps && (
                  <p className="text-sm text-error mt-1">{errors.actionSteps}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Estimated Impact"
                  type="text"
                  placeholder="e.g., Saves 20% energy"
                  value={formData.estimatedImpact}
                  onChange={(e) => handleInputChange('estimatedImpact', e.target.value)}
                />

                <Input
                  label="Time to Implement"
                  type="text"
                  placeholder="e.g., 5 minutes"
                  value={formData.timeToImplement}
                  onChange={(e) => handleInputChange('timeToImplement', e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-4 border-t border-border">
                <Button
                  type="submit"
                  variant="default"
                  iconName="Send"
                  iconPosition="left"
                >
                  Submit Tip
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TipSubmissionForm;