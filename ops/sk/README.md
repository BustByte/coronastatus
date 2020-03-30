# SK deployment

This deployment is very simple:
* requires only a VM with git client, docker engine, docker-compose installed, a TLS certificate/key pair and you are good to go.
* [Traefik v1](https://traefik.io/) edge router is used as an application proxy that is routing requests to the app on the VM. Both run as docker containers.
* [Cloudflare (free plan)](https://support.cloudflare.com/hc/en-us/articles/115000479507-Managing-Cloudflare-Origin-CA-certificates) is used at the edge as a DNS/CDN/WAF/proxy. The deployment uses [Cloudflare origin CA certificates](https://support.cloudflare.com/hc/en-us/articles/115000479507-Managing-Cloudflare-Origin-CA-certificates) on the server. It's configured to:
  * rewrite all HTTP-> HTTPS (allow only TLS 1.2+)
  * Redirect www.coronastatus.tld to coronastatus.tld.
  * Perform the CSS/JS/HTML compression
* You can also use builtin support of Traefik to autogenerate Let's encrypt TLS certs if you don't need any LB at the edge.

## Installation

1. Create a VM with any OS that can run docker engine and git client - minimal/slim versions of Ubuntu 18.04 or Debian buster are recommended.
2. Install following dependencies:
- [git](https://git-scm.com/downloads)
- [Docker CE](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
3. Create a non-privileged user for the application: `useradd -m -s /bin/bash app`
4. Add user to `docker` group: `usermod -a -G docker app`
5. Enable docker to start on boot: `systemctl enable --now docker`
6. Apply latest OS updates
7. Do some basic system hardening (configure firewall, stop unused services, ...) and OS tuning

## App deployment & configuration

1. Login to the VM, switch to the app user: `sudo -i -u app`
2. Clone the repository: `git clone https://github.com/BustByte/coronastatus`
3. Move into the newly cloned directory: `cd coronastatus`
4. Create a configuration file from the example provided in this repo: `cp config.example.json config.json`
5. Review the `docker-compose.yml` file in this deployment directory
6. Create the `certs` directory and copy the Cloudflare TLS certificate/key there: `certs/tls.crt`, `certs/tls.key`
7. Install node modules: `docker-compose run --rm app yarn`
8. Start the project: `docker-compose up -d`. Containers will be automatically re/started on boot/container crash.
9. Display the logs to see everything is running properly: `docker-compose logs -f`
10. Enjoy :-)
