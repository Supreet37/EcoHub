import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const IdeaDetailModal = ({ idea, isOpen, onClose, onBookmark, isBookmarked }) => {
  if (!isOpen || !idea) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-success bg-success/10';
      case 'intermediate':
        return 'text-warning bg-warning/10';
      case 'advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-background rounded-xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto eco-shadow-modal">
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(idea.difficulty)}`}>
                  {idea.difficulty}
                </span>
                <h2 className="text-xl font-semibold text-foreground">
                  {idea.title}
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onBookmark(idea.id)}
                  className={`p-2 rounded-lg eco-transition ${
                    isBookmarked
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                  <Icon name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} size={20} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 eco-transition"
                  aria-label="Close modal"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Image and Overview */}
                <div>
                  <div className="relative overflow-hidden rounded-lg mb-6">
                    <Image
                      src={idea.image}
                      alt={idea.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Description</h3>
                      <p className="text-muted-foreground">{idea.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="Clock" size={16} className="text-primary" />
                          <span className="text-sm font-medium">Time Required</span>
                        </div>
                        <span className="text-foreground font-semibold">{idea.timeRequired}</span>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="Leaf" size={16} className="text-success" />
                          <span className="text-sm font-medium">Impact</span>
                        </div>
                        <span className="text-foreground font-semibold">{idea.environmentalImpact}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Instructions and Materials */}
                <div>
                  {/* Materials Needed */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Materials Needed</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {idea.materials.map((material, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                          <Icon name="Package" size={14} className="text-primary" />
                          <span className="text-sm">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools Required */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Tools Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {idea.tools.map((tool, index) => (
                        <span key={index} className="flex items-center space-x-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                          <Icon name="Wrench" size={12} />
                          <span>{tool}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Step-by-Step Instructions</h3>
                    <div className="space-y-4">
                      {idea.instructions.map((step, index) => (
                        <div key={index} className="flex space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-foreground">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  iconName="Share"
                  iconPosition="left"
                >
                  Share Project
                </Button>
                <Button
                  iconName="Download"
                  iconPosition="left"
                >
                  Save Instructions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IdeaDetailModal;