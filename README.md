# OneHub RAENG Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vite](https://img.shields.io/badge/Bundler-Vite-blue.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/Framework-React-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/Author-Dev.Hub-orange.svg)](https://github.com/hs-d3vhub)

---

## 📖 Sobre o Projeto

OneHub RAENG é uma plataforma web de gestão integrada, desenvolvida com foco em segurança, que unifica o monitoramento de contratos, colaboradores, equipamentos e insumos. Seu principal objetivo é fornecer:

- Controle completo de EPIs, treinamentos e ferramentas.
- Rastreabilidade via QR Code para eficiência operacional.
- Relatórios e indicadores detalhados para suporte à tomada de decisão.

---

## 🚀 Tecnologias Utilizadas

| Camada            | Ferramentas/Libraries                                   |
| ----------------- | -------------------------------------------------------- |
| **Interface**     | React, Tailwind CSS, Lucide Icons, shadcn/ui            |
| **Estado & Dados**| React Query (ou SWR), Zustand (opcional)                |
| **Validação**     | Zod, @hookform/resolvers                                 |
| **Formulários**   | React Hook Form                                         |
| **Bundler**       | Vite                                                    |
| **Linter & Formatter** | ESLint, Prettier                                    |
| **Testes**        | Vitest, React Testing Library                           |
| **CI/CD**         | GitHub Actions, Vercel/Netlify                          |

---

## 🗂 Estrutura de Pastas

```
src/
├── assets/                  # Imagens, logos e arquivos estáticos
├── components/              # Componentes reutilizáveis
│   ├── BrandingColumn
│   ├── LoginForm
│   └── ...
├── features/                # Estrutura orientada a features/domínios
│   ├── auth/                # Login, cadastro, hooks, context
│   ├── dashboard/
│   └── colaboradores/
├── hooks/                   # Custom React Hooks
├── lib/                     # Utilitários, helpers, configurações
├── pages/                   # Páginas principais (rota-padrão)
├── providers/               # Context Providers (Theme, Auth, etc.)
├── styles/                  # CSS global, variáveis, configurações do Tailwind
└── utils/                   # Funções utilitárias variadas
```

---

## ⚙️ Pré-requisitos

- Node.js v16+ ou Yarn
- npm 8+ ou Yarn 1+

---

## 💾 Instalação & Uso

1. Clone o repositório:
   ```bash
   git clone https://github.com/hs-d3vhub/onehub-raeng-system.git
   cd onehub-raeng-system
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou com Yarn
   yarn install
   ```

3. Configure variáveis de ambiente (se aplicável):
   ```bash
   cp .env.example .env
   # edite .env com suas chaves/urls
   ```

4. Execute em modo de desenvolvimento:
   ```bash
   npm run dev
   # ou yarn dev
   ```
   - Acesse em `http://localhost:8080`

5. Para gerar build de produção:
   ```bash
   npm run build
   # ou yarn build
   ```

6. Preview da build de produção:
   ```bash
   npm run preview
   # ou yarn preview
   ```

---

## 📦 Scripts Disponíveis

| Comando        | Descrição                                           |
| -------------- | ---------------------------------------------------- |
| `npm run dev`  | Inicia servidor de desenvolvimento (Hot Module Reload)|
| `npm run build`| Gera build otimizada para produção                  |
| `npm run preview` | Serve build de produção localmente                |
| `npm run lint` | Executa ESLint em todos os arquivos                  |
| `npm run format` | (opcional) Formata projeto com Prettier             |
| `npm run test` | (opcional) Executa suíte de testes via Vitest       |

---

## 🛠️ Configurações de Lint & Formatação

- **ESLint**: Configuração baseada em `@eslint/js` e `@typescript-eslint`.
- **Prettier**: Recomenda-se criar `prettier.config.js` e usar `lint-staged` + Husky para pré-commits.

Exemplo de `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write .",
    "test": "vitest"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## ✅ Testes & Cobertura

- Usar **Vitest** para testes unitários:
  ```bash
  npm run test
  ```
- Cobertura de testes automática configurável em `vitest.config.ts`.

---

## 🚀 CI/CD

Sugestão de workflow GitHub Actions (`.github/workflows/ci.yml`):

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

Para deploy automático, use Vercel ou Netlify integrando o repositório.

---

## 🤝 Contribuição

1. Fork do repositório
2. Crie uma branch feature: `git checkout -b feature/nome-da-feature`
3. Faça commits claros e atômicos
4. Rode `npm run lint` e `npm run test`
5. Abra um Pull Request descrevendo o que foi alterado

---

## 📜 Licença

Este projeto é licenciado sob a **MIT License**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

> Desenvolvido com ♥ por **Hugo Serra - Dev.Hub** | [GitHub](https://github.com/hs-d3vhub)

