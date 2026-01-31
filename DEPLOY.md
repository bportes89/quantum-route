# 🚀 Guia de Deploy Oficial (QuantumRoute)

Este guia cobre a publicação do projeto em ambiente de produção **Zero Cost**.

---

## 1. GitHub (Código Fonte)

Primeiro, suba o código para o seu repositório.

1.  Crie um novo repositório no [GitHub](https://github.com/new) chamado `quantum-route`.
2.  No terminal do seu projeto, execute:

```bash
git remote add origin https://github.com/SEU_USUARIO/quantum-route.git
git branch -M main
git push -u origin main
```

---

## 2. Render (Backend Python)

O Render vai hospedar a API FastAPI e os solvers.

1.  Crie uma conta no [Render](https://render.com).
2.  Clique em **"New"** -> **"Blueprints"**.
3.  Conecte seu repositório do GitHub.
4.  O Render vai detectar automaticamente o arquivo `render.yaml` que criei na raiz.
5.  Clique em **"Apply"**.
6.  **Pronto!** Sua API estará online em alguns minutos.
    *   Copie a URL gerada (ex: `https://quantumroute-backend.onrender.com`).

---

## 3. Vercel (Frontend Next.js)

A Vercel vai hospedar a interface visual.

1.  Crie uma conta na [Vercel](https://vercel.com).
2.  Clique em **"Add New..."** -> **"Project"**.
3.  Importe o repositório `quantum-route`.
4.  **Configuração Importante:**
    *   Em **"Framework Preset"**, escolha `Next.js`.
    *   Em **"Root Directory"**, clique em `Edit` e selecione a pasta `frontend`.
5.  **Variáveis de Ambiente:**
    *   Expanda a seção **"Environment Variables"**.
    *   Adicione `NEXT_PUBLIC_API_URL` com o valor da URL do seu Backend no Render (ex: `https://quantumroute-backend.onrender.com`).
    *   Adicione `NEXT_PUBLIC_MAPBOX_TOKEN` com o seu token do Mapbox.
6.  Clique em **"Deploy"**.

---

## 🚀 Validação Final

1.  Acesse a URL fornecida pela Vercel.
2.  Faça o upload de um CSV de teste.
3.  Verifique se a otimização retorna os dados do Backend.
4.  Clique em "Enviar p/ Motorista" para testar a integração com WhatsApp.

**Parabéns! Você tem um SaaS de Logística Quântica rodando.**
