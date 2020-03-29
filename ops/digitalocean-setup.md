# Setting up a server on DigitalOcean

1. Point domain to `ns1.digitalocean.com`, `ns2.digitalocean.com` and `ns3.digitalocean.com`
2. Go to the Network tab in DO and add the domain.
3. Create a Droplet and select the following:
    1. Use the Mexico image.
    2. Select the $20 tier.
    3. Select the closest data center to the country the site is intented for.
    4. Select "Private networking".
    5. Select "Enable monitoring"
    6. Add your public key (probably already in the image if you're on the core team).
    7. Give it a hostname "coronastatus-[country]". 
4. Go back to the network tab and select the domain.
    1. Add an `A` record:  `@` > `Select the Droplet`
    2. Add a `CNAME` record: `dev` > `@`
    3. Add a `CNAME` record: `www` > `@`
5. ssh into the machine: `ssh app@[ip-of-droplet]`
6. Rename Mexican directory names to the correct name
    1. Rename `/srv/coronastatus.mx/` to `/srv/coronastatus.[tld]`
    2. Rename `/srv/dev.coronastatus.mx/` to `/srv/dev.coronastatus.[tld]`
    3. Edit line in `/srv/scripts/deploy-prod.sh` to the same directory as step 6a.
    4. Edit line in `srv/scripts/deploy-dev.sh` to the same directory as step 6b.
7. Change the nginx virtual host configurations
    1. Rename `/etc/nginx/sites-available/coronastatus.mx` to `/etc/nginx/sites-available/coronastatus.[tld]` 
    2. Rename `/etc/nginx/sites-available/dev.coronastatus.mx` to `/etc/nginx/sites-available/dev.coronastatus.[tld]`
    3. Edit server name line in `/etc/nginx/sites-available/coronastatus.[tld]` to `coronastatus.[tld] www.coronastatus.[tld]`
    4. Edit server name line in `/etc/nginx/sites-available/dev.coronastatus.[tld]` to `dev.coronastatus.[tld]`
    5. Remove (`rm`) the symlinks in `/etc/nginx/sites-enabled/*`
    5. Add new symlink to new virtual host `ln -s /etc/nginx/sites-available/coronastatus.[tld] /etc/nginx/sites-enabled/coronastatus.[tld]` 
    6. Add new symlink to new virtual host `ln -s /etc/nginx/sites-available/dev.coronastatus.[tld] /etc/nginx/sites-enabled/dev.coronastatus.[tld]` 
    7. Reload nginx by running `sudo service nginx reload`
    8. Run certbot `sudo certbot --nginx`, select all, and enable redirect from http to https.
    9. If step above fails the DNS records are probably incorrect. Double check with domain owner.
8. Change the systemd script to point to correct directory (we don't rename the systemd job for easier deployments).
    1. Edit `/etc/systemd/system/coronastatusnl.servce` and change the name to `coronastatus.[tld] app`
    2. Edit `/etc/systemd/system/coronastatusnl.servce` and change workspacce directory to `/srv/coronastatus.[tld]`
    3. Reload systemd by running `sudo systemctl daemon-reload`
9. Update the config for the site
    1. Edit `/srv/coronastatus.[tld]/config.json` with the correct config values
    2. Delete or move the `/srv/coronastatus.[tld]/covid_db*` files to somewhere else.
    3. Deploy the latest version by running `/srv/scripts/deploy-prod.sh`
    4. Try to start the server outside of systemd to check that it boots: `yarn start`
    5. Confirm that the site works correctly by visiting `https://coronastatus.[tld]
10. Add the domain to the `ops/deploy-prod-all.sh` script. 
