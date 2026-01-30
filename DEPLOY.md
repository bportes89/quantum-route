# 🚀 Guia de Deploy - QuantumRoute

Este guia descreve o passo-a-passo para colocar o QuantumRoute no ar (Produção).

## 1. Pré-requisitos

*   Conta no [GitHub](https://github.com/) (para hospedar o código).
*   Conta na [Vercel](https://vercel.com/) (para o Frontend).
*   Conta no [Render](https://render.com/) (para o Backend).
*   Conta no [Mapbox](https://www.mapbox.com/) (para os mapas).

---

## 2. Preparando o Código

1.  Crie um repositório no GitHub (ex: `quantum-route`).
2.  Suba o código do projeto para lá:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/SEU_USUARIO/quantum-route.git
    git push -u origin main
    ```

---

## 3. Backend (API Python) - Hospedagem no Render

O Render é excelente para APIs Python/FastAPI.

1.  Acesse o [Dashboard do Render](https://dashboard.render.com/).
2.  Clique em **New +** -> **Web Service**.
3.  Conecte seu repositório do GitHub.
4.  Configure:
    *   **Name:** `quantum-route-api`
    *   **Root Directory:** `backend` (Importante! O código Python está nessa pasta)
    *   **Environment:** `Python 3`
    *   **Build Command:** `pip install -r requirements.txt`
    *   **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 10000`
5.  **Environment Variables (Variáveis de Ambiente):**
    *   Adicione `PYTHON_VERSION` = `3.9.0` (ou superior)
6.  Clique em **Create Web Service**.
7.  Aguarde o deploy. Ao final, você receberá uma URL (ex: `https://quantum-route-api.onrender.com`). **Copie essa URL.**

---

## 4. Frontend (Next.js) - Hospedagem na Vercel

A Vercel é a criadora do Next.js, então é a melhor casa para ele.

1.  Acesse o [Dashboard da Vercel](https://vercel.com/dashboard).
2.  Clique em **Add New...** -> **Project**.
3.  Importe o mesmo repositório do GitHub.
4.  Configure:
    *   **Framework Preset:** Next.js
    *   **Root Directory:** Clique em Edit e selecione a pasta `frontend`.
5.  **Environment Variables:**
    *   `NEXT_PUBLIC_MAPBOX_TOKEN`: *Seu token público do Mapbox (pk....)*
    *   `NEXT_PUBLIC_API_URL`: *A URL do seu Backend no Render (passo anterior)*.
        *   *Obs: Você precisará ajustar o código do frontend para usar essa variável se ele estiver com `localhost` fixo.*
6.  Clique em **Deploy**.

---

## 5. Ajuste Final (Conexão Front <-> Back)

Se o seu código frontend estiver apontando para `http://localhost:8000`, você precisará alterá-lo para usar a URL de produção.

**No arquivo `frontend/components/UploadForm.tsx`:**

De:
```javascript
await axios.post('http://localhost:8000/optimize', ...
```

Para:
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
await axios.post(`${API_URL}/optimize`, ...
```

Faça essa alteração, dê commit e push. A Vercel atualizará automaticamente.

---

## 6. Teste Final

Acesse a URL que a Vercel gerou (ex: `https://quantum-route.vercel.app`).
Seu sistema está no ar, acessível de qualquer lugar do mundo! 🌍🚀
