# Gestão de Times e Tarefas

## Descrição

Este projeto é uma aplicação de gestão de times e tarefas.

## Instalação Backend

Após o Clone do projeto navegue até a pasta backend

Instale as dependências utilizando: ˋnpm installˋ

Crie um arquivo .env com as variáveis de ambiente na raiz do diretório backend :

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

Para iniciar o Servidor utilize ˋnpm startˋ. Mantenha-o em execução durante todo o teste do projeto.

## Instalação Front-end

Navegue até a pasta frontend e instale as dependências com o comando "npm i" ou "npm install".
Crie outro arquivo .env na raiz do diretório frontend, um pouco diferente do anterior:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

Isso é necessário para que o firebase consiga acessar as variáveis de ambiente e adquirir as credenciais de acesso. O Vite permite apenas o acesso caso a variável inicie com "VITE_".

Finalmente, execute o comando "npm run dev" dentro do diretório frontend e abra a página localizada por padrão em "http://localhost:5173/".

## Utilização da Aplicação
### Login
Ao iniciar o projeto, a página de login será exibida. Utilize o e-mail "admin@admin.com" e a senha "admin123" para iniciar a sessão. Ela persistirá até que seja realizado o logoff da aplicação.
### Home
A tela principal é a "Gerenciar Atividades". Nela é possível visualizar todas as equipes e seus respectivos colaboradores, assim como identificar as cargas de trabalho acumuladas e acessar e excluir as atividades individualmente. Ao fim da página, é possível utilizar o formulário de criação de atividades, para atribuir uma nova atividade a um colaborador.
### Teams
A tela de "Gerenciar Equipes" nos permite criar novas equipes, adicionar novos colaboradores às equipes já existentes e também excluí-los, caso não existam atividades atribuídas a ele. Da mesma forma, em equipes que não possuem nenhum colaborador, é possível deletar o time inteiramente.

Note que todos os logins cadastrados para colaboradores possuem acesso à ferramenta.

<a href="https://www.youtube.com/watch?v=7PCFDKDcA7I"/>


