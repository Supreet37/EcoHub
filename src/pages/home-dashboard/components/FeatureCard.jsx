import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  color = 'primary',
  stats,
  isNew = false 
}) => {
  const navigate = useNavigate();

  const colorClasses = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    success: 'text-success bg-success/10 border-success/20',
    secondary: 'text-secondary bg-secondary/10 border-secondary/20',
    accent: 'text-accent bg-accent/10 border-accent/20'
  };

  const iconColorClasses = {
    primary: 'text-primary',
    success: 'text-success',
    secondary: 'text-secondary',
    accent: 'text-accent'
  };

  return (
    <div className="group relative bg-card rounded-xl border border-border eco-shadow-card hover:shadow-lg eco-transition p-6 h-full">
      {/* New Badge */}
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
          New
        </div>
      )}

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${colorClasses[color]}`}>
        <Icon name={icon} size={24} className={iconColorClasses[color]} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary eco-transition">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        {/* Stats */}
        {stats && (
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">{stats.label}</div>
            <div className="text-lg font-semibold text-foreground">{stats.value}</div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-auto pt-4">
        <Button
          variant="outline"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => navigate(route)}
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default FeatureCard;