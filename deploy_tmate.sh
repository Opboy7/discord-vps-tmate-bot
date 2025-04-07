#!/bin/bash

# Stop and remove existing container if it exists
if [ "$(docker ps -a -q -f name=tmate-container)" ]; then
    docker rm -f tmate-container
fi

# Start a new tmate container
docker run -d --name tmate-container alpine \
    sh -c "apk add --no-cache tmate openssh && tmate -F" > /dev/null

# Wait for the container to be fully initialized
sleep 3

# Get the SSH connection string
docker exec tmate-container tmate display -p '#{tmate_ssh}'
