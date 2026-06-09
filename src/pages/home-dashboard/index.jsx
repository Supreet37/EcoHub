import React from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';
import EnvironmentalStats from './components/EnvironmentalStats';
import DailyTipPreview from './components/DailyTipPreview';
import ChallengeHighlights from './components/ChallengeHighlights';

const HomeDashboard = () => {
  const features = [
    {
      title: "Carbon Footprint Calculator",
      description: "Calculate your environmental impact across transportation, energy usage, and lifestyle choices with detailed insights and actionable recommendations.",
      icon: "Calculator",
      route: "/carbon-footprint-calculator",
      color: "primary",
      stats: {
        label: "Average Reduction",
        value: "23% CO₂"
      }
    },
    {
      title: "Reuse Ideas Gallery",
      description: "Discover creative ways to repurpose everyday items with step-by-step guides, community submissions, and sustainability impact metrics.",
      icon: "Lightbulb",
      route: "/reuse-ideas-gallery",
      color: "secondary",
      stats: {
        label: "Ideas Available",
        value: "500+"
      }
    },
    {
      title: "Eco Challenges Hub",
      description: "Join gamified environmental challenges, track your progress, earn rewards, and compete with a global community of eco-warriors.",
      icon: "Target",
      route: "/eco-challenges-hub",
      color: "success",
      stats: {
        label: "Active Challenges",
        value: "127"
      },
      isNew: true
    },
    {
      title: "Daily Green Tips",
      description: "Get personalized sustainability advice with practical tips, cost savings calculations, and environmental impact measurements.",
      icon: "BookOpen",
      route: "/daily-green-tips",
      color: "accent",
      stats: {
        label: "Tips Database",
        value: "1,200+"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Sustainability Tools & Resources
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Comprehensive suite of tools designed to help you measure, reduce, and offset your environmental impact while building sustainable habits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  route={feature.route}
                  color={feature.color}
                  stats={feature.stats}
                  isNew={feature.isNew}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Environmental Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <EnvironmentalStats />
          </div>
        </section>

        {/* Daily Tip and Challenge Highlights */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <DailyTipPreview />
            <ChallengeHighlights />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who are already reducing their environmental impact and building a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-card rounded-lg p-6 border border-border eco-shadow-card">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Live Impact</span>
                </div>
                <div className="text-2xl font-bold text-success">2,547 kg</div>
                <div className="text-sm text-muted-foreground">CO₂ saved today</div>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border eco-shadow-card">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Community</span>
                </div>
                <div className="text-2xl font-bold text-primary">50,247</div>
                <div className="text-sm text-muted-foreground">Active members</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🌱</span>
                </div>
                <span className="text-xl font-bold">EcoHub</span>
              </div>
              <p className="text-background/80 mb-4">
                Empowering individuals and communities to create a sustainable future through innovative tools, education, and collective action.
              </p>
              <div className="text-sm text-background/60">
                © {new Date().getFullYear()} EcoHub. Building a greener tomorrow, today.
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-background/80">
                <li>Carbon Calculator</li>
                <li>Reuse Ideas</li>
                <li>Eco Challenges</li>
                <li>Green Tips</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-background/80">
                <li>Join Challenges</li>
                <li>Share Ideas</li>
                <li>Track Progress</li>
                <li>Get Support</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeDashboard;