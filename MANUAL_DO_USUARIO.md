# 📘 Manual do Usuário - QuantumRoute
> **Guia Rápido de Uso**

Este documento explica como utilizar a plataforma QuantumRoute para otimizar suas rotas de entrega.

---

## 1. Acessando a Plataforma
Ao abrir o sistema, você verá a tela inicial com o botão **"Começar Agora"**.
*   Clique neste botão para abrir a janela de envio de arquivos.

---

## 2. Preparando os Dados (Importante)
O sistema funciona lendo um arquivo `.csv` com os dados das suas entregas.

1.  Na janela de upload, clique em **"Baixar modelo CSV padrão"**.
2.  Preencha este arquivo com suas entregas, respeitando as colunas:
    *   `lat` e `lng`: Latitude e Longitude (use **ponto** para decimais, ex: `-23.55`).
    *   `time_start` e `time_end`: Janela de horário (formato `HH:MM`).
    *   `demand`: Peso ou volume da carga.
3.  Salve o arquivo no seu computador.

---

## 3. Otimizando as Rotas
1.  Arraste o arquivo `.csv` preenchido para a área indicada na tela.
2.  Quando o arquivo for reconhecido (a borda ficará verde), clique em **"Enviar"** (o processamento inicia automaticamente ao soltar ou selecionar o arquivo, dependendo da configuração).
3.  Aguarde o processamento (pode levar alguns segundos enquanto o algoritmo calcula as rotas).

---

## 4. Analisando os Resultados
Após o processamento, o painel de resultados será exibido:

*   **Economia Projetada:** Porcentagem de redução de KM comparada a uma rota padrão.
*   **Mapa:** Visualização das rotas traçadas no mapa.
*   **Comparativo:** Mostra a diferença entre a distância do método clássico e do método QuantumRoute.

---

## 5. Executando as Rotas
Abaixo do mapa, você encontrará a lista de veículos e suas respectivas rotas ("Manifesto de Execução").

1.  Identifique o veículo (ex: Veículo V1).
2.  Clique no botão azul **"Navegar (Google Maps)"**.
3.  Isso abrirá uma nova aba no Google Maps com a rota já montada.
4.  **Dica:** Copie o link do navegador e envie para o motorista (via WhatsApp ou e-mail).

> **Nota:** O botão "Enviar p/ Motorista" na interface atual é visual. Utilize o link do Google Maps para compartilhar a rota.

---

## Solução de Problemas

*   **Arquivo não carrega:** Verifique se está no formato `.csv` e se os números usam ponto (`.`) em vez de vírgula (`,`).
*   **Erro de conexão:** Verifique se o servidor backend está rodando.

---

## 6. Modelo Comercial e Metrificação (FAQ)

Se seu cliente perguntar "Como vocês cobram?" ou "Como provam que funciona?", utilize estas respostas:

### Como é a metrificação? (Cobrança)
Utilizamos o modelo de **Veículo Ativo Mensal (VAM)**.
*   O cliente paga uma mensalidade fixa por veículo que utilizar o sistema no mês.
*   Não há limite de rotas ou entregas.
*   Exemplo: Se a frota tem 10 caminhões, mas só 5 saíram para entrega este mês, a fatura será sobre 5.

### Como é medido o sucesso? (Economia)
O sistema calcula automaticamente o **Delta de Eficiência** em cada rota:
1.  **Cenário Base (Manual):** Simulamos quanto o motorista rodaria seguindo a ordem da planilha (sem inteligência).
2.  **Cenário Otimizado (Quantum):** A rota calculada pelo nosso algoritmo.
3.  **Economia Real:** A diferença entre (1) e (2). É comum observarmos reduções de **15% a 30%** na quilometragem total.
