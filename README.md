# SABOR & ARTE 🍲📱

Aplicativo mobile feito com **React Native** + **Expo Router** para inspirar cozinheiros e entusiastas da culinária a registrar, consultar e compartilhar receitas de forma prática e organizada.

---

## 📱 Funcionalidades

- ✅ **Cadastro e login de usuários**
  - Validação de email
  - Máscara e validação de telefone
- ✅ **Autenticação com controle de sessão via Context API**
- ✅ **CRUD completo de receitas**:
  - Nome
  - Ingredientes
  - Modo de preparo
  - Tempo de preparo
  - Classificação
  - Associação com o usuário autor
- ✅ **Visualização de receitas**
  - Todas as receitas
  - Minhas receitas (filtradas)
- ✅ **Edição e exclusão de receitas**
- ✅ **Feedback visual com modais de sucesso e erro**
- ✅ Navegação fluida com [Expo Router](https://expo.github.io/router/)

---

## 🧑‍🍳 Telas implementadas

| Tela            | Descrição |
|-----------------|-----------|
| `Login`         | Acesso com email e senha |
| `Cadastro`      | Criação de conta com validações |
| `Profile`       | Tela inicial com navegação |
| `Receita`       | Cadastro e edição de receitas |
| `MinhasReceitas`| Lista apenas do usuário logado |
| `Consulta`      | Lista de todas as receitas |

---

## 🧠 Arquitetura

- **Componentização** e **organização por features**
- `contexts/authContext.tsx` para autenticação global
- `hooks/useCRUD.ts` para chamadas genéricas à API
- Tipagem forte com **TypeScript**
- Validações com **Zod**
- Navegação com **Expo Router**

---

## 🌐 API REST

- Base URL: `http://10.118.1.252:3000`
- Endpoints:
  - `POST /usuario` – criar usuário
  - `POST /usuario/auth` – autenticar login
  - `GET/POST/PATCH/DELETE /receita` – CRUD de receitas

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://expo.github.io/router/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Context API](https://reactjs.org/docs/context.html)

---

## 🚀 Como executar

```bash
# Instale as dependências
npm install

# Inicie o projeto com Expo
npx expo start

👤 Desenvolvedores 
[@sksbassi](https://github.com/sksbassi)
[@joaovcpires](https://github.com/joaovcpires)
