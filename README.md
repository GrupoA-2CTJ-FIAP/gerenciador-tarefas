# Gestão de Times e Tarefas

## Descrição

Este projeto é uma aplicação de gestão de times e tarefas.

## Instalação

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

Para iniciar o Servidor utilize ˋnpm startˋ

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
