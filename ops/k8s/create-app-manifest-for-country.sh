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
  IN_PATH="apps/template.yml";
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
create_manifest_for_country "coronastatus.no" "no" "norway"
create_manifest_for_country "coronastatus.co" "co" "colombia"
create_manifest_for_country "coronastatus.us" "us" "usa"
create_manifest_for_country "coronastatus.it" "it" "italy"
