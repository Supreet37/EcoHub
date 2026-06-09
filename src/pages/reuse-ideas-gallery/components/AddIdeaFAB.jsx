import React from 'react';
import Icon from '../../../components/AppIcon';

const AddIdeaFAB = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full eco-shadow-modal hover:scale-105 eco-transition-spring flex items-center justify-center z-30"
      aria-label="Add new reuse idea"
    >
      <Icon name="Plus" size={24} />
    </button>
  );
};

export default AddIdeaFAB;