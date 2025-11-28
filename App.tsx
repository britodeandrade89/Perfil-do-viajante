import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import TravelerForm from './components/TravelerForm';
import AgentPortal from './components/AgentPortal';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'traveler' | 'agent'>('landing');

  const renderView = () => {
    switch (view) {
      case 'traveler':
        return <TravelerForm onBack={() => setView('landing')} />;
      case 'agent':
        return <AgentPortal onBack={() => setView('landing')} />;
      case 'landing':
      default:
        return <LandingPage onSelectTraveler={() => setView('traveler')} onSelectAgent={() => setView('agent')} />;
    }
  };

  return (
    <div className="main-container">
      {renderView()}
    </div>
  );
};

export default App;