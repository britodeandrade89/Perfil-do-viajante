import React, { useState } from 'react';

interface TravelerFormProps {
  onBack: () => void;
}

const TravelerForm: React.FC<TravelerFormProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const clientName = formData.get('nome_cliente') as string;
    
    const submissionData = {
      nome_cliente: clientName,
      contato: formData.get('contato'),
      destino: formData.get('destino'),
      quem_vai: formData.get('quem_vai'),
      data_ida: formData.get('data_ida'),
      data_volta: formData.get('data_volta'),
      aeroporto_saida: formData.get('aeroporto_saida'),
      bagagem: formData.get('bagagem'),
      cia_aerea: formData.get('cia_aerea'),
      transporte: formData.getAll('transporte'),
      pagamento: formData.getAll('pagamento'),
      plataforma: formData.getAll('plataforma'),
      ciente_regras: formData.get('ciente_regras'),
      obs: formData.get('obs'),
    };

    // Save to localStorage
    const existingSubmissions = JSON.parse(localStorage.getItem('travelerSubmissions') || '[]');
    const newSubmission = {
      id: new Date().toISOString(),
      data: submissionData
    };
    existingSubmissions.unshift(newSubmission); // Add new submissions to the top
    localStorage.setItem('travelerSubmissions', JSON.stringify(existingSubmissions));

    // Trigger WhatsApp notification
    const message = encodeURIComponent(`${clientName || 'Um novo cliente'} acabou de preencher o formulário.`);
    const whatsappUrl = `https://wa.me/5521994527694?text=${message}`;
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
  };

  if (submitted) {
    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <div className="header">
                <h1 className="logo-text">Obrigado! ✅</h1>
                <p className="subtitle">Seu perfil foi enviado com sucesso. Em breve entraremos em contato!</p>
            </div>
            <button onClick={onBack} type="button">Voltar ao Início</button>
        </div>
    );
  }

  return (
    <div className="container">
      <button onClick={onBack} type="button" style={{ backgroundColor: '#6c757d', marginBottom: '20px', width: 'auto', padding: '10px 20px' }}>
          &larr; Voltar
      </button>
      <div className="header">
        <h1 className="logo-text">Check-in, GO! ✈️</h1>
        <p className="subtitle">Anamnese de Perfil para Montagem de Roteiro</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="section-title">1. A Viagem</div>

        <label htmlFor="nome_cliente">Nome do Cliente:</label>
        <input type="text" id="nome_cliente" name="nome_cliente" required />

        <label htmlFor="contato">Email ou WhatsApp:</label>
        <input type="text" id="contato" name="contato" required />

        <label htmlFor="destino">Destino:</label>
        <input type="text" id="destino" name="destino" placeholder="Ex: Beto Carrero, SC" required />

        <label htmlFor="quem_vai">Quem vai viajar? (Ex: 1 adulto, 2 crianças de 8 e 10 anos)</label>
        <input type="text" id="quem_vai" name="quem_vai" required />

        <label>Datas (Ida e Volta):</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="date" name="data_ida" required aria-label="Data de Ida" />
          <input type="date" name="data_volta" required aria-label="Data de Volta" />
        </div>

        <div className="section-title">2. Voos e Bagagem</div>

        <label htmlFor="aeroporto_saida">Aeroporto de Preferência (Saída):</label>
        <input type="text" id="aeroporto_saida" name="aeroporto_saida" placeholder="Ex: Galeão ou Santos Dumont" />

        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
          <legend>Bagagem:</legend>
          <div className="options-group">
            <div className="option-item">
              <input type="radio" id="bag1" name="bagagem" value="mao_10kg" defaultChecked />
              <label htmlFor="bag1">Mala de Mão (10kg) + Mochila (Gratuito)</label>
            </div>
            <div className="option-item">
              <input type="radio" id="bag2" name="bagagem" value="despachada" />
              <label htmlFor="bag2">Preciso despachar mala (23kg) - Custo extra</label>
            </div>
          </div>
        </fieldset>

        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
          <legend>Cia Aérea Preferida:</legend>
          <div className="options-group">
            <div className="option-item">
              <input type="radio" id="cia1" name="cia_aerea" value="indiferente" defaultChecked />
              <label htmlFor="cia1">Indiferente (Foco no menor preço)</label>
            </div>
            <div className="option-item">
              <input type="radio" id="cia2" name="cia_aerea" value="azul" />
              <label htmlFor="cia2">Azul</label>
            </div>
            <div className="option-item">
              <input type="radio" id="cia3" name="cia_aerea" value="gol" />
              <label htmlFor="cia3">Gol</label>
            </div>
            <div className="option-item">
              <input type="radio" id="cia4" name="cia_aerea" value="latam" />
              <label htmlFor="cia4">Latam</label>
            </div>
          </div>
        </fieldset>
        
        <div className="section-title">3. Transporte no Destino</div>
        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
          <legend>Como pretende se locomover lá?</legend>
          <div className="options-group">
            <div className="option-item">
              <input type="checkbox" id="trans1" name="transporte" value="aluguel_carro" />
              <label htmlFor="trans1">Vou alugar carro (Dirijo lá)</label>
            </div>
            <div className="option-item">
              <input type="checkbox" id="trans2" name="transporte" value="uber" />
              <label htmlFor="trans2">Uber / 99 / Táxi</label>
            </div>
            <div className="option-item">
              <input type="checkbox" id="trans3" name="transporte" value="transfer" />
              <label htmlFor="trans3">Serviço de Transfer / Van</label>
            </div>
            <div className="option-item">
              <input type="checkbox" id="trans4" name="transporte" value="publico" />
              <label htmlFor="trans4">Transporte Público</label>
            </div>
          </div>
        </fieldset>

        <div className="section-title">4. Pagamento e Compra</div>
        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
          <legend>Formas de pagamento preferidas:</legend>
          <div className="options-group">
            <div className="option-item">
              <input type="checkbox" id="pag1" name="pagamento" value="cartao_credito" />
              <label htmlFor="pag1">Cartão de Crédito (Parcelado)</label>
            </div>
            <div className="option-item">
              <input type="checkbox" id="pag2" name="pagamento" value="pix" />
              <label htmlFor="pag2">PIX (Com desconto)</label>
            </div>
            <div className="option-item">
              <input type="checkbox" id="pag3" name="pagamento" value="boleto_koin" />
              <label htmlFor="pag3">Boleto Parcelado / KOIN</label>
            </div>
          </div>
        </fieldset>

        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
          <legend>Plataformas de compra:</legend>
          <div className="options-group">
            <div className="option-item">
              <input type="checkbox" id="plat1" name="plataforma" value="qualquer" defaultChecked />
              <label htmlFor="plat1">A mais barata (Google Voos/Skyscanner)</label>
            </div>
            <div className="option-item">
              <input type="checkbox" id="plat2" name="plataforma" value="viajanet" />
              <label htmlFor="plat2">Viajanet / Decolar</label>
            </div>
            <div className="option-item">
              <input type="checkbox" id="plat3" name="plataforma" value="hoteiscom" />
              <label htmlFor="plat3">Hoteis.com</label>
            </div>
            <div className="option-item">
              <input type="checkbox" id="plat4" name="plataforma" value="milhas" />
              <label htmlFor="plat4">Usar minhas milhas</label>
            </div>
          </div>
        </fieldset>

        <div className="disclaimer-box">
          <strong>⚠️ Atenção aos Pagamentos:</strong>
          <ul>
            <li>Taxas de embarque no cartão costumam vir na 1ª parcela.</li>
            <li>Alguns voos internacionais ou promoções "relâmpago" podem não aceitar parcelamento.</li>
          </ul>
        </div>
        <div className="options-group" style={{ marginTop: '15px', border: 'none', background: 'none', padding: 0 }}>
          <div className="option-item">
            <input type="checkbox" id="ciente_regras" name="ciente_regras" value="true" required />
            <label htmlFor="ciente_regras">Estou ciente sobre as regras de parcelamento.</label>
          </div>
        </div>
        <label htmlFor="obs">Observações Extras:</label>
        <textarea id="obs" name="obs" rows={4} placeholder="Ex: Horários preferidos, restrições, etc."></textarea>
        <button type="submit">ENVIAR PERFIL 🚀</button>
      </form>
    </div>
  );
};

export default TravelerForm;
