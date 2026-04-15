# PetShop PoC

Prova de Conceito de um sistema de PetShop desenvolvida em **Angular 21** com **Angular Material** e dados mockados via **RxJS BehaviorSubject** (sem backend).

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [Angular CLI](https://angular.dev/tools/cli) v21

```bash
npm install -g @angular/cli
```

---

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url-do-repositorio>
cd petshop-poc
npm install
```

---

## Executando o projeto

```bash
ng serve
```

Acesse `http://localhost:4200` no navegador. A aplicação recarrega automaticamente a cada alteração.

---

## Credenciais de teste

| Perfil    | Email                  | Senha |
|-----------|------------------------|-------|
| Cliente   | joao@email.com         | 123   |
| Cliente   | maria@email.com        | 123   |
| Admin     | admin@petshop.com      | admin |

---

## Funcionalidades

### Área do Cliente
- Login simulado com redirecionamento por perfil
- Cadastro de pets (nome, espécie, raça, CPF do dono)
- Visualização da lista de pets cadastrados
- Agendamento de serviço — escolha de pet, serviço e data/hora
- Acompanhamento do status dos agendamentos

### Área do Administrador
- Painel exclusivo com quadro Kanban
- Visualização de todos os agendamentos
- Alteração de status: `Agendado` → `No Banho` → `Finalizado`
- Notificação via SnackBar ao marcar um pet como `Finalizado`

---

## Estrutura do projeto

```
src/app/
├── core/
│   ├── models/
│   │   └── types.model.ts          # Interfaces e types (Usuario, Pet, Agendamento...)
│   ├── services/
│   │   └── mock-data.ts            # MockDataService — persistência com BehaviorSubject
│   └── guards/
│       ├── auth-guard.ts           # Protege rotas de cliente autenticado
│       └── admin-guard.ts          # Protege rota exclusiva do admin
├── features/
│   ├── login/                      # Tela de login
│   ├── cliente/
│   │   └── dashboard/              # Dashboard do cliente (Pets + Agendamentos)
│   └── admin/
│       └── kanban/                 # Painel admin com Kanban de status
├── app.routes.ts                   # Rotas com lazy loading e guards
└── app.config.ts                   # Configuração global da aplicação
```

---

## Build para produção

```bash
ng build
```

Os artefatos gerados ficam em `dist/petshop-poc/`.

---

## Tecnologias utilizadas

| Tecnologia       | Versão  | Uso                          |
|------------------|---------|------------------------------|
| Angular          | 21      | Framework principal          |
| Angular Material | 21      | Componentes de UI            |
| RxJS             | 7+      | BehaviorSubject para mock    |
| TypeScript       | 5+      | Tipagem estática             |
| SCSS             | —       | Estilização dos componentes  |
