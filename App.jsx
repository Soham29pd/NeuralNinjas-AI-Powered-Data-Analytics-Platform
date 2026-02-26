import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Assistant from "./pages/Assistant";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";   // ✅ ADD THIS LINE
import Onboarding from "./pages/Onboarding";
import "./App.css";
import DataSelection from "./pages/DataSelection";
import CreatorInsights from "./pages/CreatorInsights";

import Assessment from "./pages/Assessment"; // ✅ ADD THIS LINE
import PersonalInsights from "./pages/PersonalInsights";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/personal-insights" element={<PersonalInsights />} />
            <Route path="/data-selection" element={<DataSelection />} />
            <Route path="/creator-insights" element={<CreatorInsights />} />
          </Routes>

        </main>
      </div>
    </Router>
  );
}

export default App;
