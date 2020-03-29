# Setting up a server on DigitalOcean

1. Point domain to `ns1.digitalocean.com`, `ns2.digitalocean.com` and `ns3.digitalocean.com`
2. Go to the Network tab in DO and add the domain.
3. Create a Droplet and select the following:
    3a. Use the Mexico image.
    3b. Select the $20 tier.
    3c. Select the closest data center to the country the site is intented for.
    3d. Select "Private networking".
    3e. Select "Enable monitoring"
    3f. Add your public key (probably already in the image if you're on the core team).
    3f. Give it a hostname "coronastatus-[country]". 
4. Go back to the network tab and select the domain.
    4a. Add an `A` record:  `@` > `Select the Droplet`
    4b. Add a `CNAME` record: `dev` > `@`
    4c. Add a `CNAME` record: `www` > `@`
5. ssh into the machine: `ssh app@[ip-of-droplet]`
6. Rename Mexican directory names to the correct name
    6a. Rename `/srv/coronastatus.mx/` to `/srv/coronastatus.[tld]`
    6b. Rename `/srv/dev.coronastatus.mx/` to `/srv/dev.coronastatus.[tld]`
    6c. Edit line in `/srv/scripts/deploy-prod.sh` to the same directory as step 6a.
    6d. Edit line in `srv/scripts/deploy-dev.sh` to the same directory as step 6b.
7. Change the nginx virtual host configurations
    7a. Rename `/etc/nginx/sites-available/coronastatus.mx` to `/etc/nginx/sites-available/coronastatus.[tld]` 
    7b. Rename `/etc/nginx/sites-available/dev.coronastatus.mx` to `/etc/nginx/sites-available/dev.coronastatus.[tld]`
    7c. Edit server name line in `/etc/nginx/sites-available/coronastatus.[tld]` to `coronastatus.[tld] www.coronastatus.[tld]`
    7d. Edit server name line in `/etc/nginx/sites-available/dev.coronastatus.[tld]` to `dev.coronastatus.[tld]`
    7e. Remove (`rm`) the symlinks in `/etc/nginx/sites-enabled/*`
    7f. Add new symlink to new virtual host `ln -s /etc/nginx/sites-available/coronastatus.[tld] /etc/nginx/sites-enabled/coronastatus.[tld]` 
    7g. Add new symlink to new virtual host `ln -s /etc/nginx/sites-available/dev.coronastatus.[tld] /etc/nginx/sites-enabled/dev.coronastatus.[tld]` 
    7h. Reload nginx by running `sudo service nginx reload`
    7f. Run certbot `sudo certbot --nginx`, select all, and enable redirect from http to https.
    7g. If step above fails the DNS records are probably incorrect. Double check with domain owner.
8. Change the systemd script to point to correct directory
    8a. Edit `/etc/systemd/system/coronastatusnl.servce` and change the name to `coronastatus.[tld] app`
    8b. Edit `/etc/systemd/system/coronastatusnl.servce` and change workspacce directory to `/srv/coronastatus.[tld]`
    8c. Reload systemd by running `sudo systemctl daemon-reload`
9. Update the config for the site
    9a. Edit `/srv/coronastatus.[tld]/config.json` with the correct config values
    9b. Deploy the latest version by running `/srv/scripts/deploy-prod.sh`
    9c. Try to start the server outside of systemd to check that it boots: `yarn start`
    9d. Confirm that the site works correctly by visiting `https://coronastatus.[tld]
