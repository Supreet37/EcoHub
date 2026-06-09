import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import MobileMenuDrawer from './MobileMenuDrawer';

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Home',
      path: '/home-dashboard',
      icon: 'Home',
      description: 'Environmental overview and feature discovery'
    },
    {
      label: 'Calculator',
      path: '/carbon-footprint-calculator',
      icon: 'Calculator',
      description: 'Assess your environmental impact'
    },
    {
      label: 'Ideas',
      path: '/reuse-ideas-gallery',
      icon: 'Lightbulb',
      description: 'Creative reuse and upcycling solutions'
    },
    {
      label: 'Challenges',
      path: '/eco-challenges-hub',
      icon: 'Target',
      description: 'Gamified environmental tasks'
    },
    {
      label: 'Tips',
      path: '/daily-green-tips',
      icon: 'BookOpen',
      description: 'Daily sustainability advice'
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-background border-b border-border eco-shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink to="/home-dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Leaf" size={20} color="white" />
                </div>
                <span className="text-xl font-heading font-semibold text-foreground">
                  EcoHub
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-md text-sm font-medium eco-transition flex items-center space-x-2 ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`
                    }
                    title={item.description}
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Environmental Message */}
            <div className="hidden lg:block">
              <div className="text-sm text-muted-foreground font-caption">
                <span className="text-success font-medium">🌱</span>
                <span className="ml-1">Every action counts</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted eco-transition"
                aria-expanded="false"
                aria-label="Toggle navigation menu"
              >
                <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navigationItems={navigationItems}
      />
    </>
  );
};

export default NavigationBar;