import React, { useState, useRef, useEffect } from 'react';
import './ocamento.css';

function Orcamento() {
  const [pessoas, setPessoas] = useState(0);
  const [valor, setValor] = useState(0);
  const [criancas, setCriancas] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const [tamanhoSalao, setTamanhoSalao] = useState(0);
  const [custosemmargem, setCustoSemMargem] = useState(0);
  const [precisaLimpeza, setPrecisaLimpeza] = useState(false);
  

  // Estado para refeições
  const [refeicoes, setRefeicoes] = useState([]);
  const [nomeRefeicao, setNomeRefeicao] = useState('');
  const [valorRefeicao, setValorRefeicao] = useState('');

  // Estado para equipe
  const [equipe, setEquipe] = useState([]);
  const [nomeEquipe, setNomeEquipe] = useState('');
  const [valorEquipe, setValorEquipe] = useState('');

  // estado itens alugados
  const [itensAlugados, setItensAlugados] = useState([]);
  const [nomeItemAlugado, setNomeItemAlugado] = useState('');
  const [valorItemAlugado, setValorItemAlugado] = useState('');
  const [quantidadeItemAlugado, setQuantidadeItemAlugado] = useState('');

  const resultadoRef = useRef(null);

  // margens
  const [margemRefeicao, setMargemRefeicao] = useState(30);
  const [margemEquipe, setMargemEquipe] = useState(30);
  const [margemItens, setMargemItens] = useState(30);
  const [margemLimpeza, setMargemLimpeza] = useState(30);

  let valorLimpeza = 0;
  if (precisaLimpeza) {
    if (tamanhoSalao <= 40) {
      valorLimpeza = 180;
    } else if (tamanhoSalao <= 100) {
      valorLimpeza = 280;
    } else {
      valorLimpeza = 280 + ((tamanhoSalao - 100) * 1.5);
    }
  }

  let valorLimpezaComMargem = valorLimpeza * (1 + margemLimpeza / 100);
  
  
// ====================================================
// Calcular orçamento
// ====================================================

  useEffect(() => {
    let totaldepessoas = (pessoas - criancas) + (criancas / 2);
    let somaRefeicoes = refeicoes.reduce((acc, ref) => acc + ref.valor, 0);
    let custoTotalRefeicoes = somaRefeicoes * totaldepessoas;
    let custoEquipe = equipe.reduce((acc, eq) => acc + eq.valor, 0);
    let custoTotalEquipe = custoEquipe * duracao;
    let custoTotalItensAlugados = itensAlugados.reduce((acc, item) => acc + (item.valor * item.quantidade), 0);
    let total = custoTotalRefeicoes + custoTotalEquipe + custoTotalItensAlugados;
    setValor(total);
  }, [pessoas, criancas, duracao, refeicoes, equipe, itensAlugados]);

  const adicionarRefeicao = () => {
    if (nomeRefeicao && valorRefeicao) {
      setRefeicoes([
        ...refeicoes,
        { nome: nomeRefeicao, valor: Number(valorRefeicao) }
      ]);
      setNomeRefeicao('');
      setValorRefeicao('');
    }
  };

  const removerRefeicao = (index) => {
    setRefeicoes(refeicoes.filter((_, i) => i !== index));
  };  

  const adicionarEquipe = () => {
    if (nomeEquipe && valorEquipe) {
      setEquipe([
        ...equipe,
        { nome: nomeEquipe, valor: Number(valorEquipe) }
      ]);
      setNomeEquipe('');
      setValorEquipe('');
    }
  };

  const removerEquipe = (index) => {
    setEquipe(equipe.filter((_, i) => i !== index));
  };

  const adicionarItemAlugado = () => {
    if (nomeItemAlugado && valorItemAlugado && quantidadeItemAlugado) {
      setItensAlugados([
        ...itensAlugados,
        { nome: nomeItemAlugado, valor: Number(valorItemAlugado), quantidade: Number(quantidadeItemAlugado) }
      ]);
      setNomeItemAlugado('');
      setValorItemAlugado('');
      setQuantidadeItemAlugado('');
    }
  };

    const removerItemAlugado = (index) => {
      setItensAlugados(itensAlugados.filter((_, i) => i !== index));
    };

  const copiarOrcamento = () => {
    if (resultadoRef.current) {
        const texto = resultadoRef.current.innerText;
        navigator.clipboard.writeText(texto);
        alert('Orçamento copiado!');
    }
  };

useEffect(() => {
  let totaldepessoas = (pessoas - criancas) + (criancas / 2);
  let somaRefeicoes = refeicoes.reduce((acc, ref) => acc + ref.valor, 0);
  let custoTotalRefeicoes = somaRefeicoes * totaldepessoas;
  let custoEquipe = equipe.reduce((acc, eq) => acc + eq.valor, 0);
  let custoTotalEquipe = custoEquipe * duracao;
  let custoTotalItensAlugados = itensAlugados.reduce((acc, item) => acc + (item.valor * item.quantidade), 0);

  let custoTotalSemMargem = custoTotalRefeicoes + custoTotalEquipe + custoTotalItensAlugados + valorLimpeza;

  // Aplicando margens
  let totalRefeicoesComMargem = custoTotalRefeicoes * (1 + margemRefeicao / 100);
  let totalEquipeComMargem = custoTotalEquipe * (1 + margemEquipe / 100);
  let totalItensComMargem = custoTotalItensAlugados * (1 + margemItens / 100);
  let totalLimpezaComMargem = valorLimpeza * (1 + margemLimpeza / 100);

  let total = totalRefeicoesComMargem + totalEquipeComMargem + totalItensComMargem + totalLimpezaComMargem;
  setValor(total);
  setCustoSemMargem(custoTotalSemMargem);
}, [pessoas, criancas, duracao, refeicoes, equipe, itensAlugados, margemRefeicao, margemEquipe, margemItens, valorLimpeza]);

// ====================================================
// Retorno do componente
// ====================================================

  return (
    <div className="orcamento-container">
      <h1>Simulador de Orçamento de Evento</h1>
      <label>
        Quantidade de pessoas total:
        <input type="number" value={pessoas} onChange={e => setPessoas(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Quantidade de crianças (quantos do total contam como meia pessoa):
        <input type="number" value={criancas} onChange={e => setCriancas(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Duração do evento em horas:
        <input type="number" value={duracao} onChange={e => setDuracao(Number(e.target.value))} />
      </label>
      <br />
      <label>
        tamanho do salão:
        <input type="number" value={tamanhoSalao} onChange={e => setTamanhoSalao(Number(e.target.value))} />
      </label>
      <label>
        Precisa de limpeza?
        <input
          type="checkbox"
          checked={precisaLimpeza}
          onChange={e => setPrecisaLimpeza(e.target.checked)}
        />
      </label>
      <br />      
      <h3>Adicionar Refeição</h3>
      <p>Cada refeição adicionada aumenta o custo por pessoa e este custo é o valor estimado que uma pessoa consumirá.</p>
      <input
        type="text"
        placeholder="Nome da refeição"
        value={nomeRefeicao}
        onChange={e => setNomeRefeicao(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor por pessoa"
        value={valorRefeicao}
        onChange={e => setValorRefeicao(e.target.value)}
      />
      <button onClick={adicionarRefeicao}>Adicionar</button>
      <ul>
        {refeicoes.map((ref, idx) => (
          <li key={idx}>
            {ref.nome} - R$ {ref.valor} por pessoa
            <button onClick={() => removerRefeicao(idx)}>Excluir</button>
          </li>
        ))}
      </ul>
      <h3>Equipe para o Evento</h3>
      <input
        type="text"
        placeholder="Função (ex: Cozinheira)"
        value={nomeEquipe}
        onChange={e => setNomeEquipe(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={valorEquipe}
        onChange={e => setValorEquipe(e.target.value)}
      />
      <button onClick={adicionarEquipe}>Adicionar</button>
      <ul>
        {equipe.map((eq, idx) => (
          <li key={idx}>
            {eq.nome} - R$ {eq.valor}
            <button onClick={() => removerEquipe(idx)}>Excluir</button>
          </li>
        ))}
      </ul>
        <h3>Itens Alugados</h3>
        <input
            type="text"
            placeholder="Nome do item"
            value={nomeItemAlugado}
            onChange={e => setNomeItemAlugado(e.target.value)}
        />
        <input
            type="number"
            placeholder="Valor"
            value={valorItemAlugado}
            onChange={e => setValorItemAlugado(e.target.value)}
        />
        <input
            type="number"
            placeholder="Quantidade"
            value={quantidadeItemAlugado}
            onChange={e => setQuantidadeItemAlugado(e.target.value)}
        />
        <button onClick={adicionarItemAlugado}>Adicionar</button>
        <ul>
          {itensAlugados.map((item, idx) => (
            <li key={idx}>
              {item.nome} - R$ {item.valor}
              <button onClick={() => removerItemAlugado(idx)}>Excluir</button>
            </li>
          ))}
        </ul>
      
      {/* ===================================================================================== 
          Ajuste de Margens
          =====================================================================================*/}

          <h3>Ajuste de Margens (%)</h3>
    <div style={{marginBottom: '18px'}}>
          <label>
            Limpeza: 
              <input
                type="range"
                min="0"
                max="500"
                value={margemLimpeza}
                onChange={e => setMargemLimpeza(Number(e.target.value))}
                style={{width: '60%', marginLeft: '10px'}}
              />
              <input
                type="number"
                min="0"
                max="500"
                value={margemLimpeza}
                onChange={e => setMargemLimpeza(Number(e.target.value))}
                style={{width: '60px', marginLeft: '10px'}}
              />%
        </label>
            <br />
                  <p>Dilua 5 Reais em alguma refeição para considerar os custos operacionais (saco de lixo, gás, papel aluminio etc.)</p>
                  <br />

        <label>
            Refeição: 
            <input
                type="range"
                min="0"
                max="500"
                value={margemRefeicao}
                onChange={e => setMargemRefeicao(Number(e.target.value))}
                style={{width: '60%', marginLeft: '10px'}}
            />
            <input
                type="number"
                min="0"
                max="500"
                value={margemRefeicao}
                onChange={e => setMargemRefeicao(Number(e.target.value))}
                style={{width: '60px', marginLeft: '10px'}}
            />%
            </label>
            <br />
            <label>
            Equipe: 
            <input
                type="range"
                min="0"
                max="500"
                value={margemEquipe}
                onChange={e => setMargemEquipe(Number(e.target.value))}
                style={{width: '60%', marginLeft: '10px'}}
            />
            <input
                type="number"
                min="0"
                max="500"
                value={margemEquipe}
                onChange={e => setMargemEquipe(Number(e.target.value))}
                style={{width: '60px', marginLeft: '10px'}}
            />%
            </label>
            <br />
            <label>
            Itens Alugados: 
            <input
                type="range"
                min="0"
                max="500"
                value={margemItens}
                onChange={e => setMargemItens(Number(e.target.value))}
                style={{width: '60%', marginLeft: '10px'}}
            />
            <input
                type="number"
                min="0"
                max="500"
                value={margemItens}
                onChange={e => setMargemItens(Number(e.target.value))}
                style={{width: '60px', marginLeft: '10px'}}
            />%
        </label>
    
    </div>

      
      <h3>Resultado do Orçamento [custo]</h3>
      <p>Orçamento para {pessoas} pessoas ({criancas} crianças) por {duracao} horas.</p>
      <p>Cada criança esta sendo contada como meia pessoa o total de pessoas consideradas é {(pessoas - criancas) + (criancas / 2)}</p>
      
      {refeicoes.length > 0 && (
        <>
      <h3>Detalhes das Refeições:</h3>
      <ul>
        {refeicoes.map((ref, idx) => (
            <li key={idx}>
                {ref.nome} - R$ {ref.valor.toFixed(2)} por pessoa
            </li>
        ))}
      </ul>
      <h3>Soma do valor das refeicoes R$ {refeicoes.reduce((acc, ref) => acc + ref.valor, 0).toFixed(2)} por pessoa</h3>
      <h3>Total em refeições R$ {(refeicoes.reduce((acc, ref) => acc + ref.valor, 0) * ((pessoas - criancas) + (criancas / 2))).toFixed(2)}</h3>
        </>
      )}
      
      <h3>Detalhes da Equipe:</h3>
        <ul>
            {equipe.map((eq, idx) => (
                <li key={idx}>
                    {eq.nome} - R$ {eq.valor.toFixed(2)}
                </li>
            ))}
        </ul>
        <h3>Soma do valor da equipe R$ {equipe.reduce((acc, eq) => acc + eq.valor, 0).toFixed(2)} por hora</h3>
        <h3>Total em equipe R$ {(equipe.reduce((acc, eq) => acc + eq.valor, 0) * duracao).toFixed(2)}</h3>
        
        {itensAlugados.length > 0 && (
        <>
            <h3>Detalhes dos Itens Alugados:</h3>
            <ul>
            {itensAlugados.map((item, idx) => (
                <li key={idx}>
                {item.nome} - R$ {item.valor.toFixed(2)} x {item.quantidade}
                </li>
            ))}
            </ul>
            <h3>Total em itens alugados R$ {itensAlugados.reduce((acc, item) => acc + (item.valor * item.quantidade), 0).toFixed(2)}</h3>
        </>
        )}

      <h3>Limpeza: R$ {valorLimpeza.toFixed(2)} {precisaLimpeza ? '(incluso)' : '(não incluso)'}</h3>
        
      <h2>Custo do evento: R$ {custosemmargem.toFixed(2)}</h2>

      <br /><hr /><br />


   {/* ===================================================================================== 
        Resultado do Orçamento com Margem
       =====================================================================================
   */}

      <div ref={resultadoRef}>

        <h3>Resultado do Orçamento</h3>
        <p>Orçamento para {pessoas} pessoas ({criancas} crianças) por {duracao} horas.</p>
        <p>Cada criança esta sendo contada como meia pessoa o total de pessoas consideradas é {(pessoas - criancas) + (criancas / 2)}</p>
        
        {refeicoes.length > 0 && (
            <>
        <h3>Detalhes das Refeições:</h3>
            <ul>
            {refeicoes.map((ref, idx) => (
                <li key={idx}>
                {ref.nome} - R$ {(ref.valor * (1 + margemRefeicao / 100)).toFixed(2)} por pessoa
                </li>
            ))}
            </ul>
            <h3>
            Soma do valor das refeições R$ {refeicoes.reduce((acc, ref) => acc + (ref.valor * (1 + margemRefeicao / 100)), 0).toFixed(2)} por pessoa
            </h3>
            <h3>
            Total em refeições R$ {(
                refeicoes.reduce((acc, ref) => acc + ref.valor, 0) *
                ((pessoas - criancas) + (criancas / 2)) *
                (1 + margemRefeicao / 100)
            ).toFixed(2)}
            </h3>
            </>
        )}
        
        <h3>Detalhes da Equipe:</h3>
            <ul>
                {equipe.map((eq, idx) => (
                    <li key={idx}>
                        {eq.nome} - R$ {(eq.valor * (1 + margemEquipe / 100)).toFixed(2)}
                    </li>
                ))}
            </ul>
            <h3>Soma do valor da equipe R$ {equipe.reduce((acc, eq) => acc + (eq.valor * (1 + margemEquipe / 100)), 0).toFixed(2)} por hora</h3>
        
            <h3>Total em equipe R$ {(equipe.reduce((acc, eq) => acc + (eq.valor * (1 + margemEquipe / 100)), 0) * duracao).toFixed(2)}</h3>
            
            {itensAlugados.length > 0 && (
            <>
                <h3>Detalhes dos Itens Alugados:</h3>
                <ul>
                {itensAlugados.map((item, idx) => (
                    <li key={idx}>
                    {item.nome} - Qtd: {item.quantidade} x R$ {(item.valor * (1 + margemItens / 100)).toFixed(2)}
                    </li>
                ))}
                </ul>
                <h3>Total em itens alugados R$ {itensAlugados.reduce((acc, item) => acc + (item.valor * (1 + margemItens / 100) * item.quantidade), 0).toFixed(2)}</h3>
            </>
            )}
            <h3>Limpeza: R$ {valorLimpezaComMargem.toFixed(2)} {precisaLimpeza ? '(incluso)' : '(não incluso)'}</h3>
            
        <h2>Orçamento para o evento: R$ {valor.toFixed(2)}</h2>
    </div>
      
        <button onClick={copiarOrcamento}>Copiar Orçamento</button>
    </div>
  );
}

export default Orcamento;