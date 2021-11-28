# Manual build and push

# Login and retrieve an authentication token
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 995365708897.dkr.ecr.us-west-2.amazonaws.com

# Build container
docker build -t webservice .

# Tag build
docker tag webservice:latest 995365708897.dkr.ecr.us-west-2.amazonaws.com/webservice:latest

# Push container
docker push 995365708897.dkr.ecr.us-west-2.amazonaws.com/webservice:latest