#!/usr/bin/env bash
set -e;

# Creates a kubernetes manifest for a specific country.
# The manifest includes deployments, ingress and services.
#
# Usage:
#   create_manifest_for_country domain country-code country-name
#
# Example:
#   create_manifest_for_country "coronastatus.no" "no" "norway"
create_manifest_for_country() {
  DOMAIN=$1;
  COUNTRY_CODE=$2;
  COUNTRY_NAME=$3;

  CONTAINER_TAG="bustbyte/coronastatus";
  IN_PATH="template.yml";
  OUT_PATH="apps/${COUNTRY_NAME}.yml";

  sed \
    -e "s|{{ domain }}|${DOMAIN}|" \
    -e "s|{{ country-code }}|${COUNTRY_CODE}|" \
    -e "s|{{ country-name }}|${COUNTRY_NAME}|" \
    -e "s|{{ container-tag }}|${CONTAINER_TAG}|" \
    "${IN_PATH}" > "${OUT_PATH}";

  echo "Generated ${OUT_PATH} for ${DOMAIN} (${COUNTRY_NAME}).";
}

# This is where we add countries we want to host.
# Each line here will produce a file in apps/*.yml.
create_manifest_for_country "coronastatus.no"     "no" "norway"
create_manifest_for_country "coronastatus.co"     "co" "colombia"
create_manifest_for_country "coronastatus.us"     "us" "usa"
create_manifest_for_country "coronastatus.it"     "it" "italy"
create_manifest_for_country "coronastatus.mx"     "mx" "mexico"
create_manifest_for_country "coronastatus.es"     "es" "spain"
create_manifest_for_country "coronastatus.net.br" "br" "brazil"
create_manifest_for_country "coronastatus.ro"     "ro" "romania"
create_manifest_for_country "coronastatus.ph"     "ph" "philippines"
create_manifest_for_country "coronastatus.id"     "id" "indonesia"
create_manifest_for_country "corona-status.cz"    "cz" "czech"
create_manifest_for_country "coronastatusnp.com"  "np" "nepal"
create_manifest_for_country "coronastatus.lt"     "lt" "lithuania"
create_manifest_for_country "coronastatustr.com"  "tr" "turkey"
create_manifest_for_country "coronastatus.pt"     "pt" "portugal"
create_manifest_for_country "corona-status.in"    "in" "india"
create_manifest_for_country "coronastatusmt.com"  "mt" "malta"
create_manifest_for_country "coronastatus.ng"     "ng" "nigeria"
create_manifest_for_country "coronastatusau.org"  "au" "australia"
create_manifest_for_country "coronastatus.org.ua" "ua" "ukraine"

