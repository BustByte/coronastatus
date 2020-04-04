#!/usr/bin/env bash

# Do not proceed if a deployment fails.
set -e

# All the coronastatus sites that are hosted on DO.
declare -a HOSTS=(
    'coronastatus.us'
    'coronastatus.co'
    # 'coronastatus.fr'
    'coronastatus.mx'
    'coronastatus.net.br'
    'coronastatus.org.ua'
    'coronastatus.es'
    'coronastatusau.org'
    'coronastatus.ng'
    'coronastatus.it'
    'coronastatusmt.com'
    'corona-status.in'
    'coronastatus.pt'
    'coronastatustr.com'
    'coronastatus.lt'
    'coronastatusnp.com'
    'corona-status.cz'
    'coronastatus.id'
    'coronastatus.ph'
    'coronastatus.ro'

#   Adriaan told med to wait with deploying NL.
#   'coronastatus.nl'

#   Deploy script is a little differnt for the Norwegian site.
#   'coronastatus.no'

#    These sites are not hosted with us.
#   'coronastatus.sk'
#   'coronastatus.dk'
#   'coronastatus.ca'
#   'coronastatus.sg'
#   'coronastatusmy.org'
#   'coronastatus.cl'
#   ''
);

# Deploy procedure over ssh.
DEPLOY_COMMAND='cd /srv/scripts && ./deploy-prod.sh'
for HOST in "${HOSTS[@]}"; do
    echo "> Deploying to ${HOST}:";
    ssh "app@${HOST}" $DEPLOY_COMMAND;
    echo "> Finished deploying to ${HOST}.";
done
