
# 🖨️ Gerador de Cartazes com Histórico (Next.js + Puppeteer)

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![NextJS](https://img.shields.io/badge/made%20with-Next.js-000000?logo=nextdotjs)
![Node](https://img.shields.io/badge/node-%3E=18-green)
![Status](https://img.shields.io/badge/status-100%25%20Functional-success)

Sistema para geração de cartazes promocionais em PDF com diferentes tamanhos (A3, A4, A5 e Gradil), totalmente responsivo e com histórico de arquivos gerados.

## 🔥 Funcionalidades

- 🧾 Formulário para preenchimento dos dados do cartaz
- 👀 Visualização dinâmica (preview) antes da geração
- 📄 Exportação de PDF em múltiplos formatos:
  - A3
  - A4
  - A5
  - Gradil (equivale a 4 folhas A4)
- 🗃️ Histórico dos PDFs gerados com:
  - Visualização inline no navegador
  - Download do arquivo
  - Filtros de busca e paginação
  - Exclusão individual de registros
  - Limpeza total do histórico
- 🚀 Sistema leve, baseado em Next.js 15 + Puppeteer

## 🏗️ Tecnologias Utilizadas

- ⚙️ Next.js 15 (App Router)
- 🟦 TypeScript
- 🦾 Tailwind CSS
- 🐧 Puppeteer (para geração de PDF realista)
- 📁 Banco de dados local via JSON (simples, file-based)
- 🔗 UUID (para IDs únicos dos arquivos)

## 🖥️ Como Executar Localmente

### ✅ Pré-requisitos

- Node.js >= 18
- npm ou yarn

### 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/gerador-de-cartazes.git

# Acesse a pasta
cd gerador-de-cartazes

# Instale as dependências
npm install
# ou
yarn install
```

### ▶️ Rodando em desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse no navegador:

```
http://localhost:3000
```

## 🗂️ Estrutura de Pastas

```
gerador-de-cartazes
├── public
├── src
│   ├── app
│   ├── components
│   ├── types
│   ├── utils
│   └── styles
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 📦 Build para Produção

```bash
npm run build
npm start
```

## ⚠️ Observações Importantes

- PDFs são salvos na pasta `/public` e listados automaticamente no histórico.
- A geração de PDF utiliza Puppeteer, por isso requer ambiente com Chromium. Funciona em Windows, Linux e Mac.
- O banco de dados é um arquivo JSON localizado em:

```
src/app/api/historico/historico.json
```

## 🚀 Melhorias Futuras (Sugestões)

- 🔗 Integração com bancos como SQLite ou MongoDB
- 🌐 Deploy na Vercel ou servidor próprio
- 👥 Sistema multiusuário com login
- 🎨 Templates personalizados para cartazes
- 📱 Versão mobile (PWA ou aplicativo)

## 👨‍💻 Autor

Desenvolvido por **Luiz Vinicius Ventura Belmonte**.

- 💼 [LinkedIn](https://www.linkedin.com/in/luizbelmontedev/)
- ✉️ Contato: luizbelmonte.dev@gmail.com

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.
