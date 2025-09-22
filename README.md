# k8s-training

This repository contains microservices and applications for Kubernetes training exercises.

## Project Structure

```
k8s-training/
├── api-one/
│   └── src/
│       ├── Dockerfile
│       └── main.go
├── api-two/
│   └── src/
│       ├── Dockerfile
│       └── main.go
├── app-one/
│   ├── Dockerfile
│   └── src/
├── deployment.yml
├── service.yml
└── README.md
```

## Prerequisites

- Docker
- kind (Kubernetes in Docker)
- kubectl
- Go (for building the applications)

## Setup Instructions

### 1. Create kind Cluster

```bash
# Create a kind cluster named "local-cluster"
kind create cluster --name local-cluster

# Verify cluster is running
kubectl cluster-info --context kind-local-cluster
```

### 2. Build and Load api-one Image

```bash
# Navigate to api-one source directory
cd api-one/src

# Build the Docker image
docker build -t api-one:latest .

# Load the image into kind cluster
kind load docker-image api-one:latest --name local-cluster

# Verify image is loaded
docker exec -it local-cluster-control-plane crictl images | grep api-one
```

### 3. Deploy api-one to Kubernetes

```bash
# Navigate back to project root
cd ../..

# Apply the deployment
kubectl apply -f deployment.yml

# Check deployment status
kubectl get deployments
kubectl get pods
```

### 4. Expose api-one Service

```bash
# Apply the service configuration
kubectl apply -f service.yml

# Check service status
kubectl get services
```

### 5. Access the Application

#### Method 1: Port Forwarding (Recommended)
```bash
# Forward port 8080 from service to localhost
kubectl port-forward service/api-one-service 8080:8080

# Test the application (in another terminal)
curl http://localhost:8080
# Should return: "This is API 1!"
```

#### Method 2: NodePort (Alternative)
```bash
# The service exposes port 30080
# For kind clusters, you may need additional configuration
curl http://localhost:30080
```

## Troubleshooting

### Common Issues

1. **Pod stuck in ErrImageNeverPull**
   - Ensure image name in deployment.yml matches the loaded image
   - Check loaded images: `docker exec -it local-cluster-control-plane crictl images`
   - Image should be `localhost/api-one:latest`

2. **Connection refused on localhost:30080**
   - Use port-forwarding instead: `kubectl port-forward service/api-one-service 8080:8080`

3. **Pod not starting**
   - Check pod logs: `kubectl logs deployment/k8s-training-deployment`
   - Check pod status: `kubectl describe pod <pod-name>`

### Useful Commands

```bash
# View all resources
kubectl get all

# Check pod logs
kubectl logs -f deployment/k8s-training-deployment

# Delete deployment and service
kubectl delete -f deployment.yml
kubectl delete -f service.yml

# Restart deployment
kubectl rollout restart deployment/k8s-training-deployment

# Access pod shell
kubectl exec -it <pod-name> -- /bin/sh
```

## Configuration Files

### deployment.yml
- Deploys api-one container with image `localhost/api-one:latest`
- Uses `imagePullPolicy: Never` for local images
- Exposes container port 8080

### service.yml
- Creates NodePort service exposing port 8080
- Maps to nodePort 30080 for external access
- Selects pods with label `app: training-app`

## API Endpoints

### api-one
- **URL**: `http://localhost:8080/`
- **Method**: GET
- **Response**: "This is API 1!"
- **CORS**: Enabled for all origins

## Cleanup

```bash
# Delete Kubernetes resources
kubectl delete -f service.yml
kubectl delete -f deployment.yml

# Delete kind cluster
kind delete cluster --name local-cluster

# Remove Docker image
docker rmi api-one:latest
```

## Next Steps

- Build and deploy api-two following similar steps
- Set up ingress for routing between services
- Configure persistent volumes for data storage
- Implement health checks and monitoring
