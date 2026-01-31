# ⚛️ QuantumRoute
> **Logística na Velocidade da Luz.**
> Plataforma de otimização de rotas multivariáveis utilizando Algoritmos Inspirados em Quântica (Quantum-Inspired Algorithms).

![Status](https://img.shields.io/badge/Status-MVP%20Ready-green) ![License](https://img.shields.io/badge/License-MIT-blue) ![Stack](https://img.shields.io/badge/Tech-Zero%20Cost-orange)

## 🧠 O Diferencial Quântico (O "Pulo do Gato")
O mercado de computação quântica está na fase de **"Vantagem Quântica Próxima"**. Não precisamos de um computador quântico perfeito hoje para entregar valor.

**Nossa abordagem:**
A maioria das soluções atuais (Google Maps, Waze) usa **heurísticas clássicas** que ficam presas em "mínimos locais". O QuantumRoute utiliza **Algoritmos Inspirados em Quântica (como Simulated Annealing e QAOA-Ready)**.

Esses algoritmos rodam em hardware comum (CPUs/GPUs), mas utilizam a lógica quântica de **tunelamento e sobreposição** para encontrar soluções melhores que os algoritmos tradicionais. Isso permite que entreguemos valor **agora**, enquanto o código já está pronto para quando os computadores quânticos de larga escala estiverem disponíveis.

---

## 🛠️ Stack Tecnológico (Zero Cost Production)
Como colocamos isso em produção gastando quase zero?

### **Backend (Python)**
*   **Framework:** FastAPI (Alta performance e assíncrono).
*   **Solver Clássico:** Google OR-Tools (Constraint Programming).
*   **Solver Quântico:** Qiskit / Custom Simulated Annealing (Quantum-Inspired).
*   **Processamento:** Híbrido (CPU local para instâncias leves + IBM Quantum Cloud para PoC).

### **Frontend (Next.js)**
*   **Framework:** Next.js 14 (React Server Components).
*   **Estilo:** TailwindCSS (Design moderno e responsivo).
*   **Mapas:** Mapbox GL JS (Visualização vetorial de alta performance).

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
*   Python 3.8+
*   Node.js 18+

### 1. Backend
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
*O servidor rodará em `http://localhost:8000`*

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
*Acesse `http://localhost:3000`*

---

## 📊 Comparativo: Mercado vs. QuantumRoute

| Recurso | Soluções Tradicionais | QuantumRoute |
| :--- | :--- | :--- |
| **Algoritmo** | Heurística Gulosa (Mínimo Local) | **Quantum-Inspired (Mínimo Global)** |
| **Variáveis** | Distância apenas | **Trânsito + Janelas + Carga + Combustível** |
| **Infraestrutura** | Servidores Caros | **Zero Cost (Serverless + Simuladores)** |

---

## 📂 Estrutura do Projeto
```
Projeto_QuantumRoute/
├── backend/              # API Python + Solvers
│   ├── solvers/          # Motores de Otimização (Clássico e Quântico)
│   └── models/           # Modelos de Dados Pydantic
├── frontend/             # Interface Next.js
│   ├── app/              # Páginas e Rotas
│   └── components/       # Componentes React (Mapa, Dashboard)
├── DEPLOY.md             # Guia de Deploy
├── MANUAL_DO_USUARIO.md  # Guia de Uso
└── PRESENTATION_DECK.md  # Pitch para Investidores
```

---

**QuantumRoute Team** © 2026
