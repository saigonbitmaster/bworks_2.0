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
#PAAS
USE_PAAS_SMART_CONTRACT=true 
PAAS_SMART_CONTRACT_ID=66374d040da0bf446cda98c6
PAAS_ACCESS_TOKEN=***
PAAS_PLUTUSTXS_URL=https://paas.bworks.app/api/plutustxs

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


```

## URLs

```
https://bworks.app/web/#/ -> web app
https://bworks.app/cms/#/ -> cms app
https://bworks.app/api    -> api


```

## Build docker images

```
build API image
build Nginx image
build certBot image
build mongo image
build redis image


```

## change the API urls for frontend

```
modify .env file variables reflect the login and API urls.
```
