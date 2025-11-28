import React from 'react';

interface LandingPageProps {
  onSelectTraveler: () => void;
  onSelectAgent: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectTraveler, onSelectAgent }) => {
  return (
    <div className="landing-container">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="logo logo-light" style={{ fontSize: '2.8rem' }}>
            Check-in, GO! <span className="logo-emoji">✈️</span>
          </div>
          <p>Comece Sua Próxima Aventura! Assessoria de Viagens Personalizada, Online e Presencial.</p>
        </div>
      </div>
      <div className="choices-container">
        <div className="choice-card">
          <h2><span>✈️</span>Área do Viajante</h2>
          <button onClick={onSelectTraveler} type="button" className="btn-secondary">
            QUERO PLANEJAR MINHA VIAGEM
          </button>
        </div>
        <div className="choice-card">
          <h2><span>💼</span>Área do Agente de Viagem</h2>
          <button onClick={onSelectAgent} type="button" className="btn-primary">
            PORTAL DO AGENTE
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;