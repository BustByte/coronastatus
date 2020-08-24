#!/usr/bin/env bash

for url in coronastatus.nl coronastatus.no coronastatus.dk coronastatus.es coronastatus.it coronastatus.mx coronastatus.fr coronastatus.us coronastatus.co coronastatus.com.br coronastatusau.org corona-status.in coronastatusmt.com coronastatus.sk coronastatus.org.ua coronastatus.ca coronastatus.sg coronastatus.com.ar coronastatus.cl corona-status.ch coronastatus.ng coronastatusmy.org coronastatustr.org coronastatus.lt coronastatusnp.com corona-status.cz coronastatus.id coronastatus.ph coronastatus.ro; do

   for map_path in map carte harita harta kaart kart karta karte kort map mapa mappa peta zemelapis; do
       echo $url;
       sleep 1;

       GEOJSON=$(curl --fail --silent "https://${url}/${map_path}/geojson");
       if [ $? -eq 0 ]; then
           echo $GEOJSON > geojson/$url.json;
           break;
       fi

   done;

done;
