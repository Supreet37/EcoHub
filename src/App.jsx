import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page components
import HomeDashboard from "./pages/home-dashboard";
import ReuseIdeasGallery from "./pages/reuse-ideas-gallery";
import EcoChallengesHub from "./pages/eco-challenges-hub";
import DailyGreenTips from "./pages/daily-green-tips";
import CarbonFootprintCalculator from "./pages/carbon-footprint-calculator";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/reuse-ideas-gallery" element={<ReuseIdeasGallery />} />
        <Route path="/eco-challenges-hub" element={<EcoChallengesHub />} />
        <Route path="/daily-green-tips" element={<DailyGreenTips />} />
        <Route path="/carbon-footprint-calculator" element={<CarbonFootprintCalculator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
