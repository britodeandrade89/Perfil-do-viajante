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
      // Section 1
      nome_cliente: clientName,
      contato: formData.get('contato'),
      destino: formData.get('destino'),
      quem_vai: formData.get('quem_vai'),
      data_ida: formData.get('data_ida'),
      data_volta: formData.get('data_volta'),
      // Section 2
      aeroporto_saida: formData.get('aeroporto_saida'),
      bagagem: formData.get('bagagem'),
      cia_aerea: formData.get('cia_aerea'),
      preferencia_voo: formData.get('preferencia_voo'),
      // Section 3
      transporte_destino: formData.getAll('transporte_destino'),
      // Section 4 (New)
      tipo_servico: formData.get('tipo_servico'),
      experiencia_viagem: formData.get('experiencia_viagem'),
      flexibilidade_datas: formData.get('flexibilidade_datas'),
      meios_transporte_busca: formData.getAll('meios_transporte_busca'),
      // Section 5 (New)
      plano_assessoria: formData.get('plano_assessoria'),
      // Section 6
      pagamento: formData.getAll('pagamento'),
      plataforma: formData.getAll('plataforma'),
      ciente_regras: formData.get('ciente_regras'),
      // Section 7
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
              <input type="radio" id="bag1" name="bagagem" value="Mão (10kg) + Mochila" defaultChecked />
              <label htmlFor="bag1">Mala de Mão (10kg) + Mochila (Gratuito)</label>
            </div>
            <div className="option-item">
              <input type="radio" id="bag2" name="bagagem" value="Despachada (23kg)" />
              <label htmlFor="bag2">Preciso despachar mala (23kg) - Custo extra</label>
            </div>
          </div>
        </fieldset>

        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
          <legend>Cia Aérea Preferida:</legend>
          <div className="options-group">
            <div className="option-item">
              <input type="radio" id="cia1" name="cia_aerea" value="Indiferente (menor preço)" defaultChecked />
              <label htmlFor="cia1">Indiferente (Foco no menor preço)</label>
            </div>
            <div className="option-item"><input type="radio" id="cia2" name="cia_aerea" value="Azul" /><label htmlFor="cia2">Azul</label></div>
            <div className="option-item"><input type="radio" id="cia3" name="cia_aerea" value="Gol" /><label htmlFor="cia3">Gol</label></div>
            <div className="option-item"><input type="radio" id="cia4" name="cia_aerea" value="Latam" /><label htmlFor="cia4">Latam</label></div>
          </div>
        </fieldset>

        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
            <legend>Sobre os voos, você prefere:</legend>
            <div className="options-group">
                <div className="option-item"><input type="radio" id="voo1" name="preferencia_voo" value="Voos diretos" defaultChecked /><label htmlFor="voo1">Voos diretos, mesmo que mais caros</label></div>
                <div className="option-item"><input type="radio" id="voo2" name="preferencia_voo" value="Voos com escalas para economizar" /><label htmlFor="voo2">Voos com escalas/conexões para economizar</label></div>
                <div className="option-item"><input type="radio" id="voo3" name="preferencia_voo" value="Interesse em Stopover" /><label htmlFor="voo3">Tenho interesse em Stopover (ficar dias na cidade da conexão)</label></div>
            </div>
        </fieldset>
        
        <div className="section-title">3. Transporte no Destino</div>
        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
          <legend>Como pretende se locomover lá?</legend>
          <div className="options-group">
            <div className="option-item"><input type="checkbox" id="trans1" name="transporte_destino" value="Aluguel de carro" /><label htmlFor="trans1">Vou alugar carro (Dirijo lá)</label></div>
            <div className="option-item"><input type="checkbox" id="trans2" name="transporte_destino" value="Uber/App" /><label htmlFor="trans2">Uber / 99 / Táxi</label></div>
            <div className="option-item"><input type="checkbox" id="trans3" name="transporte_destino" value="Transfer" /><label htmlFor="trans3">Serviço de Transfer / Van</label></div>
            <div className="option-item"><input type="checkbox" id="trans4" name="transporte_destino" value="Transporte Público" /><label htmlFor="trans4">Transporte Público</label></div>
          </div>
        </fieldset>

        <div className="section-title">4. Sobre Você e a Viagem</div>

        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
            <legend>Qual seu nível de experiência com viagens?</legend>
            <div className="options-group">
                <div className="option-item"><input type="radio" id="exp1" name="experiencia_viagem" value="Iniciante" defaultChecked /><label htmlFor="exp1">Iniciante (Nunca viajei ou viajei pouco)</label></div>
                <div className="option-item"><input type="radio" id="exp2" name="experiencia_viagem" value="Intermediário" /><label htmlFor="exp2">Intermediário (Já fiz algumas viagens por conta própria)</label></div>
                <div className="option-item"><input type="radio" id="exp3" name="experiencia_viagem" value="Experiente" /><label htmlFor="exp3">Experiente (Viajo com frequência e organizo tudo)</label></div>
            </div>
        </fieldset>

        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
            <legend>Você tem flexibilidade nas datas? <span style={{fontWeight: 'normal', color: '#008000'}}>(Isso pode reduzir os custos em até 30%!)</span></legend>
            <div className="options-group">
                <div className="option-item"><input type="radio" id="flex1" name="flexibilidade_datas" value="Total" defaultChecked /><label htmlFor="flex1">Sim, tenho total flexibilidade</label></div>
                <div className="option-item"><input type="radio" id="flex2" name="flexibilidade_datas" value="Parcial" /><label htmlFor="flex2">Tenho alguma flexibilidade (dias antes/depois)</label></div>
                <div className="option-item"><input type="radio" id="flex3" name="flexibilidade_datas" value="Nenhuma" /><label htmlFor="flex3">Não, as datas são fixas</label></div>
            </div>
        </fieldset>

        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
            <legend>Prefere que a busca de passagens inclua:</legend>
            <div className="options-group">
                <div className="option-item"><input type="checkbox" id="busca1" name="meios_transporte_busca" value="Avião" /><label htmlFor="busca1">Apenas Avião</label></div>
                <div className="option-item"><input type="checkbox" id="busca2" name="meios_transporte_busca" value="Ônibus" /><label htmlFor="busca2">Apenas Ônibus</label></div>
                <div className="option-item"><input type="checkbox" id="busca3" name="meios_transporte_busca" value="Avião + Ônibus" /><label htmlFor="busca3">Conciliar Avião + Ônibus</label></div>
                <div className="option-item"><input type="checkbox" id="busca4" name="meios_transporte_busca" value="Trem" /><label htmlFor="busca4">Trem (para destinos como a Europa)</label></div>
            </div>
        </fieldset>

        <div className="section-title">5. Nossos Planos de Assessoria</div>
        <p style={{textAlign: 'center', color: '#333', fontSize: '1.1em'}}>Para celebrar nosso lançamento, estamos com valores especiais!</p>
        <div className="plans-container">
            <div className="plan-card">
                <h3 className="plan-title">Consultoria Inicial</h3>
                <p className="plan-price">R$ 100</p>
                <p className="plan-description">Ideal para quem não sabe por onde começar. Batemos um papo para desenhar o rascunho da sua viagem. <strong>Valor 100% abatido</strong> se fechar uma assessoria completa!</p>
            </div>
            <div className="plan-card">
                <h3 className="plan-title">Assessoria Essencial</h3>
                <p className="plan-price">R$ 150 <span className="original-price">R$ 200</span></p>
                <p className="plan-description">Busca e monitoramento de <strong>passagens OU hospedagens</strong>, com assessoria completa via WhatsApp, plataforma online individual e suporte até o embarque.</p>
            </div>
            <div className="plan-card">
                <h3 className="plan-title">Assessoria Completa</h3>
                <p className="plan-price">R$ 200 <span className="original-price">R$ 250</span></p>
                <p className="plan-description">Tudo do plano Essencial, incluindo a busca e monitoramento de <strong>passagens E hospedagens</strong>, encontrando as melhores combinações ou pacotes.</p>
            </div>
            <div className="plan-card">
                <h3 className="plan-title">Assessoria Premium + Roteiro</h3>
                <p className="plan-price">R$ 250 <span className="original-price">R$ 300</span></p>
                <p className="plan-description">O pacote definitivo! Inclui tudo da Assessoria Completa mais a <strong>criação de um roteiro diário personalizado</strong> e otimizado para sua viagem.</p>
            </div>
        </div>

        <fieldset className="options-group" style={{border: 'none', padding: 0, marginTop: '20px'}}>
          <legend>Qual plano de assessoria você tem interesse?</legend>
          <div className="options-group">
            <div className="option-item"><input type="radio" id="plano1" name="plano_assessoria" value="Ainda não sei / Quero a Consultoria Inicial" defaultChecked /><label htmlFor="plano1">Ainda não sei / Quero a Consultoria Inicial (R$ 100)</label></div>
            <div className="option-item"><input type="radio" id="plano2" name="plano_assessoria" value="Assessoria Essencial (R$ 150)" /><label htmlFor="plano2">Assessoria Essencial (R$ 150)</label></div>
            <div className="option-item"><input type="radio" id="plano3" name="plano_assessoria" value="Assessoria Completa (R$ 200)" /><label htmlFor="plano3">Assessoria Completa (R$ 200)</label></div>
            <div className="option-item"><input type="radio" id="plano4" name="plano_assessoria" value="Assessoria Premium + Roteiro (R$ 250)" /><label htmlFor="plano4">Assessoria Premium + Roteiro (R$ 250)</label></div>
          </div>
        </fieldset>

        <div className="disclaimer-box" style={{backgroundColor: '#e9f7ff', borderColor: '#bde0fe', color: '#00568c'}}>
            <strong>Meu Papel Como Seu Agente de Viagens</strong>
            <p style={{margin: '10px 0 0'}}>Olá! É importante que você saiba que <strong>não sou uma agência de viagens</strong>, mas sim seu agente de viagens pessoal. Meu trabalho é ser uma ponte: conecto você às melhores e mais diversas opções do mercado, facilitando e intermediando todo o processo de planejamento.</p>
            <p style={{margin: '10px 0 0'}}>Dou todo o suporte necessário durante o planejamento até o momento do seu embarque. Após o embarque, a responsabilidade pela condução da viagem é sua, mas pode contar comigo para qualquer orientação que precisar!</p>
        </div>


        <div className="section-title">6. Pagamento e Compra</div>
        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
          <legend>Formas de pagamento preferidas:</legend>
          <div className="options-group">
            <div className="option-item"><input type="checkbox" id="pag1" name="pagamento" value="Cartão de Crédito" /><label htmlFor="pag1">Cartão de Crédito (Parcelado)</label></div>
            <div className="option-item"><input type="checkbox" id="pag2" name="pagamento" value="PIX" /><label htmlFor="pag2">PIX (Com desconto)</label></div>
            <div className="option-item"><input type="checkbox" id="pag3" name="pagamento" value="Boleto Parcelado" /><label htmlFor="pag3">Boleto Parcelado / KOIN</label></div>
          </div>
        </fieldset>

        <fieldset className="options-group" style={{border: 'none', padding: 0}}>
          <legend>Plataformas de compra:</legend>
          <div className="options-group">
            <div className="option-item"><input type="checkbox" id="plat1" name="plataforma" value="A mais barata" defaultChecked /><label htmlFor="plat1">A mais barata (Google Voos/Skyscanner)</label></div>
            <div className="option-item"><input type="checkbox" id="plat2" name="plataforma" value="Viajanet / Decolar" /><label htmlFor="plat2">Viajanet / Decolar</label></div>
            <div className="option-item"><input type="checkbox" id="plat3" name="plataforma" value="Hoteis.com" /><label htmlFor="plat3">Hoteis.com</label></div>
            <div className="option-item"><input type="checkbox" id="plat4" name="plataforma" value="Milhas" /><label htmlFor="plat4">Usar minhas milhas</label></div>
          </div>
        </fieldset>

        <div className="disclaimer-box" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeeba', color: '#856404'}}>
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

        <div className="section-title">7. Toques Finais</div>
        <label htmlFor="obs">Observações Extras:</label>
        <textarea id="obs" name="obs" rows={4} placeholder="Ex: Horários preferidos, restrições, se viaja com pet, etc."></textarea>
        <button type="submit">ENVIAR PERFIL 🚀</button>
      </form>
    </div>
  );
};

export default TravelerForm;