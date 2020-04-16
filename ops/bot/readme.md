# Telegram bot
`@coronastatusrobot` is a small bot that can help out with useful commands from Telegram.

## Deploy
This command let's you roll out the latest version to any site that is hosted in the DigitalOcean cluster.

### Usage

**Deploy to single site.**

```
<you>: @coronastatusrobot deploy coronastatus.it
<coronastatusrobot>: coronastatus.it deployment: HEAD is now at d110468 Translation fixes for ro-RO (#554)
```

**Deploy to multiple sites.**

```
<you>: @coronastatusrobot deploy coronastatus.it coronastatus.ro
<coronastatusrobot>: coronastatus.it deployment: HEAD is now at d110468 Translation fixes for ro-RO (#554)
<coronastatusrobot>: coronastatus.ro deployment: HEAD is now at d110468 Translation fixes for ro-RO (#554)
```

**Deploy to all sites.**

```
<you>: @coronastatusrobot deploy all
<coronastatusrobot>: coronastatus.it deployment: HEAD is now at d110468 Translation fixes for ro-RO (#554)
<coronastatusrobot>: coronastatus.ro deployment: HEAD is now at d110468 Translation fixes for ro-RO (#554)
<coronastatusrobot>: coronastatus.us deployment: HEAD is now at d110468 Translation fixes for ro-RO (#554)
