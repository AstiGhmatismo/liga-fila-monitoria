# Fila Monitoria — INFO-24 PDM

App Ionic Angular standalone para a atividade Liga Ionic, tema Fila Monitoria.

## Requisitos
- Node.js 22.23.1
- Ionic 9
- Uma aplicação Firebase criada pela pessoa estudante

## Configurar Firebase
1. Crie ou selecione seu projeto no Firebase Console e registre um app Web.
2. Ative Authentication com Email/Senha e Google.
3. Em Authentication → Settings, confirme localhost nos domínios autorizados.
4. Crie o banco Cloud Firestore.
5. Copie os dados do app Web para src/environments/environment.ts.
6. Publique as regras deste repositório no Firestore Rules. Elas permitem leitura autenticada da fila e gravação de tentativas bloqueadas; cada pessoa só pode ler suas próprias tentativas.

Os valores em environment.ts são marcadores, não credenciais. Sem trocá-los, autenticação e Firestore ficam desativados.

## Instalar e abrir
Na pasta do projeto:
    npm install
    npx ionic serve
Para compilar:
    npm run build

## Fluxo implementado
- Rota vazia redireciona para login.
- Cadastro/login com e-mail e senha, mais Google com popup.
- A lista inicial reproduz os cinco nomes, assuntos e posições do PRINTS.html.
- Filtro, seleção e contador de lugares ocupados.
- Ao continuar com cinco lugares ocupados, grava tentativa em queueActions com usuário, assunto, total, status e data do servidor; a próxima tela mostra a fila cheia e bloqueia a entrada.
- Model tipado e service raiz centralizam lista, filtro, total e limite.
- Item da fila é componente standalone com @Input e @Output.

O print mostra a fila cheia (cinco pessoas). Os cinco exemplos ficam como estado inicial se a coleção ainda estiver vazia. São dados visuais de demonstração, não uma fila real.

## Git no fork
Este pacote não inclui node_modules. Antes do envio, confira:
    git status
    git add .
    git commit -m "implementa fila de monitoria"
    git push
Se node_modules já estiver rastreado, remova-o do índice com git rm -r --cached node_modules e confirme que .gitignore inclui a pasta. Não apague arquivos em conflito; peça ajuda ao professor.
