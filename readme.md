# API Task

API desenvolvida em Node.js com TypeScript para gerenciamento de tarefas.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
- [Zod](https://zod.dev/)

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- Node.js (versão LTS recomendada)
- Docker e Docker Compose
- Git

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/api-task.git
cd api-task
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

4. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

## 🎮 Executando o projeto

Para executar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

Leandro Furtado - [GitHub](https://github.com/lefurtado)
