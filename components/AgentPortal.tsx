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
      <div className="container" style={{ textAlign: 'center', maxWidth: '400px', marginTop: '50px' }}>
        <div className="header">
          <h1 className="logo-text">Portal do Agente 💼</h1>
          <p className="subtitle">Acesso restrito</p>
        </div>
        <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
          <label htmlFor="password">Senha de Acesso:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
          {error && <p style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</p>}
          <button type="submit">Entrar</button>
        </form>
        <button onClick={onBack} type="button" style={{ backgroundColor: '#6c757d', marginTop: '20px' }}>
            &larr; Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <h1 className="logo-text" style={{margin: 0}}>Perfis de Viajantes</h1>
        <button onClick={onBack} type="button" style={{ backgroundColor: '#6c757d', width: 'auto', padding: '10px 20px', margin: 0 }}>
          &larr; Sair
        </button>
      </div>
      
      {submissions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <p>Nenhum perfil de viajante foi enviado ainda.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {submissions.map(submission => (
            <div key={submission.id} className="options-group" style={{ border: '1px solid #ddd', display: 'block' }}>
              <div style={{ borderBottom: '2px solid #008000', paddingBottom: '10px', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2em' }}>
                  {renderValue(submission.data.nome_cliente)}
                </h3>
                <p style={{ margin: '5px 0 0', color: '#555' }}>
                  <strong>Destino:</strong> {renderValue(submission.data.destino)}
                </p>
              </div>
              <p><strong>Enviado em:</strong> {new Date(submission.id).toLocaleString('pt-BR')}</p>
              <p><strong>Contato:</strong> {renderValue(submission.data.contato)}</p>
              <p><strong>Viajantes:</strong> {renderValue(submission.data.quem_vai)}</p>
              <p><strong>Datas:</strong> {renderValue(submission.data.data_ida)} a {renderValue(submission.data.data_volta)}</p>
              <p><strong>Aeroporto de Saída:</strong> {renderValue(submission.data.aeroporto_saida)}</p>
              <p><strong>Bagagem:</strong> {renderValue(submission.data.bagagem)}</p>
              <p><strong>Cia Aérea:</strong> {renderValue(submission.data.cia_aerea)}</p>
              <p><strong>Transporte:</strong> {renderValue(submission.data.transporte)}</p>
              <p><strong>Pagamento:</strong> {renderValue(submission.data.pagamento)}</p>
              <p><strong>Plataforma:</strong> {renderValue(submission.data.plataforma)}</p>
              <p><strong>Observações:</strong> {renderValue(submission.data.obs)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentPortal;
