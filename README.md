# Speed Test

Teste de velocidade de conexão de internet com interface moderna e responsiva.

## Tecnologias

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- ESModules

### Backend
- Node.js
- Express
- CORS
- Helmet
- ESModules

## Instalação

1. Instale todas as dependências de uma vez:
```bash
npm run install-all
```

Ou instale separadamente:

2. Instale dependências do backend:
```bash
cd server
npm install
```

3. Instale dependências do frontend:
```bash
cd client
npm install
```

## Configuração

1. Copie o arquivo de ambiente do backend:
```bash
cd server
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env` do servidor.

## Executando o Projeto

### Opção 1: Rodar ambos os projetos simultaneamente
```bash
npm run dev
```

### Opção 2: Rodar separadamente

Backend:
```bash
npm run server
```

Frontend (em outro terminal):
```bash
npm run client
```

### Opção 3: Rodar individualmente

Apenas backend:
```bash
cd server
npm run dev
```

Apenas frontend:
```bash
cd client
npm run dev
```

## Endpoints

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/api/health

## Scripts Disponíveis

- `npm run dev` - Roda ambos frontend e backend simultaneamente
- `npm run server` - Roda apenas o backend em modo desenvolvimento
- `npm run client` - Roda apenas o frontend em modo desenvolvimento
- `npm run build` - Build do frontend para produção
- `npm run start` - Inicia o servidor backend em modo produção
- `npm run install-all` - Instala dependências de todos os projetos

## Funcionalidades

- Teste de velocidade de download
- Teste de velocidade de upload
- Medição de ping e jitter
- Detecção de IP local e público
- Interface responsiva e moderna
- Animações suaves
- Conversão automática MB/s ↔ GB/s
