# Coronastatus
> Report your health status to get a better overview of COVID-19 in your country (currently available in Norway & The Netherlands)

## What is this?
We don't know how many people have COVID-19. So we made a website where people can self-report symptoms. We plot the submissions on a map and show graphs with trends.

### Currently available in
* 🇳🇴 Norway: https://coronastatus.no
* 🇳🇱 The Netherlands: https://coronastatus.nl
* ... want one for your country? Join our community: https://t.me/onzecorona

## Why?
The government is working on this, but they're too slow in getting something out fast.

Norwegian article that inspired us to build this:
https://www.aftenposten.no/meninger/debatt/i/P9ALzX/selvrapporteringssystem-for-overvaaking-av-korona-maa-paa-plass-naa-petter-bae-brandtzaeg

## Who's behind this?
A bunch of developers from around the world that wanted to help out. This is not an official website from the health services.

## Mentions in the media
- https://www.tu.no/artikler/utviklere-om-korona-register-vi-kastet-oss-rundt-og-laget-dette/487568

## How can I contribute?
Join our Telegram group chat here: https://t.me/onzecorona or reach out on kontakt@bustbyte.no

Click on "Issues" in the menu above to see what we need help with.

## Start developing

Download and install [nodejs](https://nodejs.org),
[git](https://git-scm.com/downloads) and [yarn](https://yarnpkg.com/)

1. Clone the repository

  `git clone https://github.com/BustByte/coronastatus.no/`

2. Move into the newly cloned directory

  `cd coronastatus.no`

3. Install dependencies with our package manager

  `yarn`

4. Create a configuration file from the example provided in this repo

  `cp config.example.json config.json`

5. Start the development webserver

  `yarn start`

6. Open your browser and navigate to http://localhost:7272/

7. Before you create a pull request run the linter. Warnings are ok, but errors should be fixed.

  `yarn lint`
