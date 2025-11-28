import React, { useState } from 'react';

interface TravelerFormProps {
  onBack: () => void;
}

const TravelerForm: React.FC<TravelerFormProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Consultoria Inicial');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const clientName = formData.get('nome_cliente') as string;
    
    const existingSubmissions = JSON.parse(localStorage.getItem('travelerSubmissions') || '[]');
    const newSubmission = {
      id: new Date().toISOString(),
      data: Object.fromEntries(formData.entries())
    };
    newSubmission.data.plano_assessoria = selectedPlan;
    existingSubmissions.unshift(newSubmission);
    localStorage.setItem('travelerSubmissions', JSON.stringify(existingSubmissions));

    const message = encodeURIComponent(`${clientName || 'Um novo cliente'} acabou de preencher o formulário.`);
    const whatsappUrl = `https://wa.me/5521994527694?text=${message}`;
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
  };

  if (submitted) {
    return (
        <div className="success-container">
            <div className="logo logo-gradient" style={{ marginBottom: '10px' }}>
                Check-in, GO! <span className="logo-emoji">✈️</span>
            </div>
            <p>Agradecemos o envio! Comece sua anamnese de Viagens Personalizada, Online e Presencial.</p>
            <div className="success-flow">
              <div className="flow-icon">🌎</div>
              <div className="flow-arrow"></div>
              <div className="flow-icon">💸</div>
              <div className="flow-arrow"></div>
              <div className="flow-icon">✅</div>
            </div>
            <button onClick={onBack} type="button" className="btn-secondary">
              PLANEJAR OUTRA VIAGEM
            </button>
        </div>
    );
  }

  return (
    <div className="form-layout-container">
      <div className="form-main">
         <div className="form-header">
            <div className="logo logo-gradient">
              Check-in, GO! <span className="logo-emoji">✈️</span>
            </div>
         </div>
         <form onSubmit={handleSubmit} id="traveler-form">
            <input type="hidden" name="plano_assessoria" value={selectedPlan} />

            <div className="form-section-header"><span>🧳</span>A Viagem</div>
            <label htmlFor="destino">Viagem</label>
            <input type="text" id="destino" name="destino" placeholder="Destino" required />

            <div className="form-section-header"><span>✈️</span>Voos e Bagagem</div>
             <label htmlFor="aeroporto_saida">Voo</label>
            <input type="text" id="aeroporto_saida" name="aeroporto_saida" placeholder="Aeroporto de saída" />

            <div className="form-section-header"><span>🚌</span>Transporte no Destino</div>
            <label htmlFor="transporte_destino">Transporte</label>
            <input type="text" id="transporte_destino" name="transporte_destino" placeholder="Tipo de transporte" />


            <div className="form-section-header"><span>👤</span>Sobre Você e a Viagem</div>
            <div className="form-grid">
              <div>
                <label htmlFor="nome_cliente">Nome</label>
                <input type="text" id="nome_cliente" name="nome_cliente" placeholder="Nome" required />
              </div>
              <div>
                <label htmlFor="sobrenome_cliente">Sobrenome</label>
                <input type="text" id="sobrenome_cliente" name="sobrenome_cliente" placeholder="Sobrenome" required />
              </div>
              <div>
                <label htmlFor="contato">Email</label>
                <input type="email" id="contato" name="contato" placeholder="Email" required />
              </div>
               <div>
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" name="senha" placeholder="Senha" required />
              </div>
            </div>
            
            <button type="submit" className="btn-primary" style={{marginTop: '40px'}}>QUERO PLANEJAR MINHA VIAGEM!</button>
          </form>
      </div>

      <div className="form-sidebar">
          <div className="sidebar-header">
            <div className="logo logo-light" style={{ fontSize: '1.8rem' }}>
              Check-in, GO! <span className="logo-emoji">✈️</span>
            </div>
            <p>Por que você vai se apaixonar.</p>
          </div>
          <div className="pricing-cards-container">
              <div 
                className={`pricing-card-sidebar ${selectedPlan === 'Consultoria Inicial' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('Consultoria Inicial')}
              >
                  <div className="pricing-card-sidebar-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1770&auto=format&fit=crop')"}}></div>
                  <div className="pricing-card-sidebar-content">
                      <h3>Consultoria Inicial</h3>
                      <p>Assessoria de Viagens e turismo.</p>
                      <div className="pricing-card-sidebar-price">
                        R$ 99 <del>R$ 150</del>
                      </div>
                  </div>
              </div>
              <div 
                className={`pricing-card-sidebar ${selectedPlan === 'Assessoria Essencial' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('Assessoria Essencial')}
              >
                  <div className="pricing-card-sidebar-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1770&auto=format&fit=crop')"}}></div>
                   <div className="pricing-card-sidebar-content">
                      <h3>Assessoria Essencial</h3>
                      <p>Assessoria de Viagens e turismo.</p>
                      <div className="pricing-card-sidebar-price">
                        R$ 99 <del>R$ 199</del>
                      </div>
                  </div>
              </div>
               <div 
                className={`pricing-card-sidebar ${selectedPlan === 'Assessoria Completa' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('Assessoria Completa')}
              >
                  <div className="pricing-card-sidebar-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbb563?q=80&w=1770&auto=format&fit=crop')"}}></div>
                   <div className="pricing-card-sidebar-content">
                      <h3>Assessoria Completa</h3>
                      <p>Assessoria de Viagens e turismo.</p>
                      <div className="pricing-card-sidebar-price">
                        R$ 149 <del>R$ 250</del>
                      </div>
                  </div>
              </div>
          </div>
          <div className="sidebar-note">
            Descubra qual o serviço se encaixa melhor na sua viagem!
          </div>
          <button type="submit" form="traveler-form" className="btn-secondary" style={{marginTop: '20px'}}>QUERO PLANEJAR MINHA VIAGEM!</button>
      </div>
    </div>
  );
};

export default TravelerForm;