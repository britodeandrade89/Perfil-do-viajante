import React, { useState, useEffect } from 'react';

interface AgentPortalProps {
  onBack: () => void;
}

type Submission = {
  id: string;
  data: { [key: string]: any };
};

const AgentPortal: React.FC<AgentPortalProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const storedSubmissions = JSON.parse(localStorage.getItem('travelerSubmissions') || '[]');
        setSubmissions(storedSubmissions);
      } catch (e) {
        console.error("Failed to parse submissions from localStorage", e);
        setSubmissions([]);
      }
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1008') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta. Tente novamente.');
      setPassword('');
    }
  };

  const renderValue = (value: any) => {
    if (Array.isArray(value) && value.length > 0) {
      return value.join(', ');
    }
    if (value) {
      return String(value);
    }
    return <span style={{ color: '#888' }}>Não informado</span>;
  };

  if (!isAuthenticated) {
    return (
      <div className="agent-portal-card" style={{ textAlign: 'center', maxWidth: '450px', margin: 'auto' }}>
        <div className="form-header" style={{textAlign: 'center', marginBottom: '20px'}}>
          <h1 style={{fontSize: '1.8rem'}}><span>💼</span> Portal do Agente</h1>
          <p style={{marginTop: '5px', color: '#666'}}>Acesso restrito</p>
        </div>
        <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
          <label htmlFor="password" style={{textAlign: 'left'}}>Senha de Acesso:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
          {error && <p style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</p>}
          <button type="submit" className="btn-primary" style={{marginTop: '20px'}}>Entrar</button>
        </form>
        <button onClick={onBack} type="button" style={{ background: 'none', color: 'var(--primary-blue)', boxShadow: 'none', marginTop: '20px' }}>
            &larr; Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="agent-portal-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '10px', borderBottom: '2px solid var(--border-color)', paddingBottom: '20px' }}>
        <h1 style={{color: 'var(--primary-dark-blue)'}}>Perfis de Viajantes</h1>
        <button onClick={onBack} type="button" style={{ backgroundColor: '#6c757d', color: 'white', width: 'auto', padding: '10px 20px', margin: 0, fontSize: '0.9rem' }}>
          &larr; Sair
        </button>
      </div>
      
      {submissions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <p style={{fontSize: '1.1rem'}}>Nenhum perfil de viajante foi enviado ainda.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {submissions.map(submission => (
            <div key={submission.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <div style={{ borderBottom: '2px solid var(--primary-teal)', paddingBottom: '10px', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2em', color: 'var(--primary-dark-blue)' }}>
                  {renderValue(submission.data.nome_cliente)} {renderValue(submission.data.sobrenome_cliente)}
                </h3>
                <p style={{ margin: '5px 0 0', color: '#555' }}>
                  <strong>Destino:</strong> {renderValue(submission.data.destino)}
                </p>
              </div>
               <p><strong>Plano Escolhido:</strong> <span style={{fontWeight: 'bold', color: 'var(--primary-blue)'}}>{renderValue(submission.data.plano_assessoria)}</span></p>
               <p style={{fontSize: '0.9rem', color: '#777', marginTop: '15px'}}>Enviado em: {new Date(submission.id).toLocaleString('pt-BR')}</p>
               <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '15px 0'}} />
              <p><strong>Contato:</strong> {renderValue(submission.data.contato)}</p>
              <p><strong>Aeroporto de Saída:</strong> {renderValue(submission.data.aeroporto_saida)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentPortal;
