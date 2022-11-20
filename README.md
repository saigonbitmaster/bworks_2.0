
## Install & run dev
```
git clone https://github.com/saigonbitmaster/bworks_2.0
add local host dns record /etc/hosts: 127.0.0.1  bworks.bworks.app

cd bworks_2.0
add .env file for frontend Apps:
REACT_APP_LOGIN_URL=http://localhost:3000/auth/login
REACT_APP_API_URL=http://localhost:3000


add .env file for backend API:
#Mongo
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_ACCOUNT=admin
DATABASE_PASSWORD=****
#Blockfrost
BLOCKFROST_PROJECT_ID=****
BLOCKFROST_URL=https://cardano-testnet.blockfrost.io/api/v0
#GitHub
GITHUB_TOKEN=****

cd bworks_2.0
yarn 
yarn build-lib
yarn api
yarn cms
yarn web
```

## Build & run app
```
git clone https://github.com/saigonbitmaster/bworks_2.0
cd bworks_2.0
export NODE_OPTIONS="--max-old-space-size=8192"
yarn 
yarn build-lib
yarn build-api
yarn build-cms
yarn build-web

frontend app after build can be run by any http server e.g nginx server
backend app after build can be run by: node main.js or pm2
```

## change the API urls for frontend
```
modify .env file variables reflect the login and API urls.
```