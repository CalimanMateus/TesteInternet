# ⚡ Speed Test Web

Teste de velocidade de internet com interface moderna, responsiva e foco em performance e diagnóstico de rede.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🧠 Sobre o Projeto

Aplicação fullstack que simula um sistema de teste de velocidade de internet, medindo:

- 📡 Latência (Ping)
- 📉 Jitter
- ⬇️ Download
- ⬆️ Upload
- 🌐 IP Local e Público

Com foco em:
- Redes e infraestrutura
- Performance de comunicação
- Arquitetura cliente-servidor

---

## 🖥️ Preview

> Interface inspirada em ferramentas profissionais de teste de rede, com velocímetro animado e feedback em tempo real.

---

## 🛠️ Tecnologias

### 🎨 Frontend
- ⚛️ React 19
- ⚡ Vite
- 🌐 React Router DOM
- 📡 Axios
- 🧩 ESModules

### 🔧 Backend
- 🟢 Node.js
- 🚀 Express
- 🔐 CORS
- 🛡️ Helmet
- 🧩 ESModules

---

## 📦 Instalação, Configuração e Execução

 =========================
 INSTALAÇÃO (TUDO DE UMA VEZ):
 
npm run install-all

 =========================
 CONFIGURAÇÃO: 

cd ../server
cp .env.example .env

# (edite o arquivo .env conforme necessário)

🌐 Endpoints

| Serviço      | URL                                                                  |
| ------------ | -------------------------------------------------------------------- |
| Frontend     | [http://localhost:5173](http://localhost:5173)                       |
| Backend API  | [http://localhost:3001](http://localhost:3001)                       |
| Health Check | [http://localhost:3001/api/health](http://localhost:3001/api/health) |


📜 Scripts
npm run dev           # roda frontend + backend
npm run server        # backend
npm run client        # frontend
npm run build         # build produção
npm run start         # backend produção
npm run install-all   # instala tudo

🚀 Funcionalidades
⚡ Teste de velocidade de download
🚀 Teste de velocidade de upload
📡 Medição de ping e jitter
🌐 Detecção de IP local e público
🎯 Interface moderna e responsiva
✨ Animações suaves
🔄 Conversão automática (MB/s ↔ GB/s)
🧠 Conceitos Aplicados

Este projeto envolve diretamente:

🌐 Redes de computadores (latência, throughput)
🖥️ Infraestrutura (API e fluxo de dados)
⚙️ Backend (Node.js e streaming)
🎨 Frontend (UX dinâmica em tempo real)
💡 Diferencial

Projeto desenvolvido com foco em simular ferramentas reais de diagnóstico de rede, unindo:

👉 programação + redes + experiência do usuário
