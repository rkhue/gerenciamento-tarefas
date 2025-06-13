# Gerenciador de Tarefas ✅

Uma aplicação web simples para gerenciar tarefas (to-do list), composta por um backend Node.js/Express com MongoDB e um frontend em HTML, CSS e JavaScript.

## Funcionalidades

- Adicione, conclua e remova tarefas
- Filtre tarefas por status: todas, pendentes ou concluídas
- Interface responsiva e moderna

---

## Estrutura do Projeto

```
gerenciamento-tarefas/
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── tasks.js
│   └── server.js
│
└── frontend/
    ├── index.html
    ├── script.js
    └── style.css
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v16+ recomendado)
- [MongoDB](https://www.mongodb.com/) rodando localmente na porta padrão (27017)

---

## Como rodar o projeto

### 1. Clone o repositório

```sh
git clone https://github.com/rkhue/gerenciamento-tarefas.git
cd gerenciamento-tarefas
```

### 2. Instale as dependências do backend

```sh
cd backend
npm install
```

### 3. Inicie o MongoDB

> Certifique-se de que o serviço do MongoDB está em execução localmente.
>
> No terminal, você pode iniciar com:
>
> ```
> mongod
> ```

### 4. Execute o backend

```sh
node server.js
```

O servidor será iniciado em [http://localhost:3000](http://localhost:3000).

### 5. Rode o frontend

Abra um novo terminal e execute:

```sh
cd frontend
```

Abra o arquivo `index.html` no seu navegador (basta dar duplo clique ou usar uma extensão como o Live Server do VSCode para servir localmente).

---

## Uso

- Adicione uma tarefa preenchendo o título e a descrição e clique em "Adicionar".
- Use o filtro para visualizar todas, pendentes ou concluídas.
- Marque tarefas como concluídas ou exclua conforme necessário.

---

## Observações

- O frontend comunica com o backend via `fetch` em `http://localhost:3000/api/tasks`.
- Se quiser rodar em produção, configure corretamente as URLs e variáveis de ambiente.
- O projeto utiliza localStorage para fallback local caso o backend não esteja disponível.
- O projeto utiliza sessionStorage para guardar o filtro atual da lista

---

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
