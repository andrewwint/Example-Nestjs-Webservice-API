# To acces any env varible to overide as ARG in the Dockerfile 
# Example $AWS_PEM_FILE 
# See for more examples https://blog.bitsrc.io/how-to-pass-environment-info-during-docker-builds-1f7c5566dd0e

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

docker stop webservice
docker build -t webservice .
docker run --rm -d -i -p 3000:3000 webservice
