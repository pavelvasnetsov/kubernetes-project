# Steps for deplyment

## Step 1: Building the backend image and uploading it to dockerhub

Go to directory with backend Dockerfile

$ docker build . -t [image name]

$ docker push [image name]

Specify the backend image in the file deployment-todos-backend.yaml

## Step 2: Download and start minikube

$ minikube start

## Step 3: Database Deployment

Go to directory with deplyment database files

$ kubectl apply -f postgres-config.yaml

$ kubectl apply -f postgres-storage.yaml

$ kubectl apply -f postgres-service.yaml

$ kubectl apply -f postgres-deployment.yaml

## Step 4: Backend Deployment

Go to directory with deplyment backend files

$ kubectl apply -f backend-config.yaml

$ kubectl apply -f deployment-todos-backend.yaml 

$ kubectl apply -f service-todos-backend.yaml 

## Step 5: Frontend Deployment

### Step 5.1

Run

$ minikube service list

and copy backend url. Paste it to .env file in frontend directory

Go to directory with frontend Dockerfile

$ docker build . -t [image name]

$ docker push [image name]

Specify the frontend image in the file deployment-todos-frontend.yaml

### Step 5.2

Go to directory with deplyment backend files

$ kubectl apply -f deployment-todos-frontend.yaml 

$ kubectl apply -f service-todos-frontend.yaml 

### Step 5.3

Run

$ minikube service list

and copy frontend url. 

This url can be inserted into the search bar of the browser and we will get a working application.
