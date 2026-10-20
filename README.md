# Fila Monitoria

Projeto individual da turma INFO-24 · PDM. Aplicação para visualizar a fila de monitoria, escolher um assunto e apresentar o limite de atendimento.

## Tecnologias

- Node.js 22.23.1
- Ionic 9 com Angular standalone
- Firebase Authentication e Cloud Firestore

## Funcionalidades

- Cadastro e login com e-mail e senha, além de login com Google.
- Redirecionamento da rota inicial para o login e proteção das telas da fila.
- Lista tipada de assuntos e posições, seleção de item e filtro por assunto.
- Contador de vagas, limite de cinco pessoas e estado de fila cheia.
- Registro de tentativa bloqueada no Firestore com usuário, assunto, total, status e data do servidor.
- Componente próprio para cada item da fila e regras centralizadas no service.

## Iniciar localmente

1. Instale o Node.js **22.23.1** e confira a versão:

   ```bash
   node --version
   ```

2. Clone a branch `main` e entre na pasta do projeto:

   ```bash
   git clone https://github.com/AstiGhmatismo/liga-fila-monitoria.git
   cd liga-fila-monitoria
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o app:

   ```bash
   npx ionic serve
   ```

   Abra no navegador o endereço local informado no terminal. Para verificar a compilação, execute `npm run build`.

## Firebase

O app Web está ligado ao projeto Firebase `ramenoslaris`. Os provedores E-mail/senha e Google estão habilitados, `localhost` está autorizado e o Cloud Firestore está criado em `southamerica-east1`.

Quando a coleção `filaMonitoria` estiver vazia, a tela usa os cinco exemplos da atividade para apresentar o estado de fila cheia. Após entrar, clique em **Continuar** para registrar a tentativa em `queueActions`. O documento contém o usuário, o assunto, o total, o status `blocked` e o horário do servidor.

O arquivo `firestore.rules` contém as regras do app. Publique-as em **Firestore Database → Regras** antes de usar a aplicação com outros usuários.

