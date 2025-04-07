#!/bin/bash

set -e

docker run -d --rm --name tmate-container ubuntu sleep infinity

docker exec -i tmate-container apt update -y
docker exec -i tmate-container apt install -y tmate openssh-client

SESSION=$(docker exec -i tmate-container tmate -S /tmp/tmate.sock new-session -d && sleep 2 && docker exec -i tmate-container tmate -S /tmp/tmate.sock display -p '#{tmate_ssh}')

echo "$SESSION"
