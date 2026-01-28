# Simulador de Orçamento de Evento

Este é um projeto simples de simulador de orçamento para eventos, desenvolvido em React. O objetivo principal é permitir a simulação rápida de custos para festas, confraternizações e outros eventos, considerando refeições, equipe, itens alugados e limpeza.

## Sobre o Projeto

- **Interface simples:** O foco foi na funcionalidade, sem muita personalização de CSS. O visual é básico, mas prático.
- **Geração por IA:** Algumas partes do código e do CSS foram geradas com auxílio de inteligência artificial, acelerando o desenvolvimento.
- **Preços prefixados:** O valor da limpeza é fixo e varia conforme o tamanho do salão. Outros valores (refeições, equipe, itens alugados) são definidos pelo usuário na simulação.
- **Margens de lucro:** É possível ajustar a margem de lucro para cada categoria (refeição, equipe, itens alugados e limpeza) usando sliders.
- **Cálculo realista:** Crianças contam como meia pessoa, e todos os cálculos são feitos em tempo real conforme os dados são preenchidos.
- **Cópia do orçamento:** O resultado pode ser copiado facilmente para ser enviado ao cliente ou salvo para referência.

## Como usar

1. Preencha o número de pessoas, crianças, duração do evento e tamanho do salão.
2. Adicione refeições, equipe e itens alugados conforme necessário.
3. Ajuste as margens de lucro de cada categoria.
4. Veja o orçamento detalhado e o valor final.
5. Use o botão "Copiar Orçamento" para copiar o resultado.

## Observações

- O sistema foi feito para uso real, mas pode ser facilmente adaptado para outras necessidades.
- Os valores de limpeza são prefixados, mas os demais valores são livres para simulação.
- O projeto foi feito rapidamente para testar funções do React e simular um sistema realista de orçamento.

## Deploy

O projeto pode ser publicado facilmente no GitHub Pages usando o comando:

```
npm run deploy
```

Acesse: [https://elderpereira.github.io/orcamento](https://elderpereira.github.io/orcamento)

---

Sinta-se à vontade para personalizar o CSS ou adaptar o sistema conforme sua necessidade!