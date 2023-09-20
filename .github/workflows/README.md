# These are auto build and deploy workflows for bworks on AWS VM instance

## There are 4 files corresponding to 4 auto build and deploy workflows for API & Frontend (cms,emp,jsk)

## What workflows do :

### api-build.yml
- Build api image docker and push to Docker Hub

### frontend-build.yml
- Generate .env from Github variables & secrets
- Copy generated .env to cms , emp , jsk folders
- Build frontend image docker and push to Docker Hub

### api-deploy.yml
- Generate .env from Github variables & secrets
- ssh to remote server (AWS VM instance)
- Copy generated .env to docker-configs folder
- Restart api service

### frontend-deploy.yml
- ssh to remote server (AWS VM instance)
- Restart frontend service
