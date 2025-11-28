import React from 'react';

interface LandingPageProps {
  onSelectTraveler: () => void;
  onSelectAgent: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectTraveler, onSelectAgent }) => {
  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <div className="header">
        <h1 className="logo-text">Check-in, GO! ✈️</h1>
        <p className="subtitle">Seu portal de viagens personalizadas</p>
      </div>
      
      <div className="section-title" style={{ justifyContent: 'center' }}>Escolha seu perfil</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
        <button onClick={onSelectTraveler} type="button">
          ✈️ Sou Viajante
        </button>
        <button onClick={onSelectAgent} type="button" style={{ backgroundColor: '#333', color: '#fff' }}>
          💼 Sou Agente de Viagem
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
