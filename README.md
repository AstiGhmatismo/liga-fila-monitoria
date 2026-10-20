# Fila Monitoria

Projeto individual da turma INFO-24 · PDM. Aplicação para visualizar a fila de monitoria, escolher um assunto e apresentar o limite de atendimento.

## Tecnologias

- Node.js 22.23.1
- Ionic 9 com Angular standalone
- Firebase Authentication e Cloud Firestore

## Funcionalidades

- Cadastro e login com e-mail e senha, além de login com Google.
- Redirecionamento da rota inicial para a tela de login e proteção das telas da fila.
- Lista tipada de assuntos, posições, seleção e filtro.
- Contador de lugares e limite de cinco pessoas.
- Estado de fila cheia com entrada bloqueada.
- Registro da tentativa no Firestore com usuário, assunto, total, status e data do servidor.
- Componentes separados para os itens da fila e regras centralizadas no serviço.

## Como configurar e iniciar

1. Instale o Node.js **22.23.1**. Confira no terminal:

   ```bash
   node --version
   ```

   O resultado esperado é `v22.23.1`.

2. No Console do Firebase, abra o projeto, registre um aplicativo Web e copie a configuração Web para `src/environments/environment.ts`.

3. No Firebase, ative os métodos de autenticação **E-mail/senha** e **Google**, adicione `localhost` aos domínios autorizados e crie um banco Cloud Firestore.

4. Publique no Firestore as regras do arquivo `firestore.rules`.

5. No terminal, abra a pasta do projeto e instale as dependências:

   ```bash
   npm install
   ```

6. Inicie o site:

   ```bash
   npx ionic serve
   ```

   O terminal mostrará o endereço local para abrir no navegador. Para conferir a compilação, execute `npm run build`.

Os campos de Firebase no repositório estão como marcadores. Sem a configuração do projeto, a tela informa que o Firebase precisa ser configurado e não habilita o login nem os registros. A lista inicial de cinco pessoas reproduz o estado cheio apresentado na atividade quando a coleção `filaMonitoria` ainda está vazia.
