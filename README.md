# Coronastatus

![](https://github.com/BustByte/coronastatus/workflows/test/badge.svg)

> Report your health status to get a better overview of COVID-19 in your country

## What is this?

We don't know how many people have COVID-19. So we made a website where people can self-report symptoms. We plot the submissions on a map and show graphs with trends.

## How can I help?

We need people who can help translate the site, develop new features, project leads for new and existing countries, and much more. Join our group chat: https://t.me/onzecorona

### In what countries have you launched Coronastatus?

- 🇳🇴 Norway: https://coronastatus.no
- 🇳🇱 The Netherlands: https://coronastatus.nl
- 🇸🇰 Slovakia: https://coronastatus.sk
- 🇩🇰 Denmark: https://coronastatus.dk
- 🇨🇴 Colombia: https://coronastatus.co
- 🇮🇹 Italy: https://coronastatus.it
- 🇫🇷 France: https://coronastatus.fr
- 🇲🇽 Mexico: https://coronastatus.mx
- 🇺🇸 United States of America (USA): https://coronastatus.us
- 🇺🇦 Ukraine: https://coronastatus.org.ua
- 🇪🇸 Spain: https://coronastatus.es
- 🇧🇷 Brazil: https://coronastatus.net.br
- 🇨🇦 Canada: https://coronastatus.ca
- 🇦🇺 Australia: https://coronastatusau.org
- 🇸🇬 Singapore: https://coronastatus.sg
- 🇦🇷 Argentina: https://coronastatus.com.ar
- 🇲🇾 Malaysia: https://coronastatusmy.org
- 🇲🇹 Malta: https://coronastatusmt.com
- 🇨🇱 Chile: https://coronastatus.cl
- 🇮🇳 India: https://corona-status.in
- 🇵🇹 Portugal: https://coronastatus.pt
- 🇹🇷 Turkey: https://coronastatustr.com
- 🇱🇹 Lithuania: https://coronastatus.lt
- 🇳🇵 Nepal: https://coronastatusnp.com
- 🇨🇿 Czech Republic: http://corona-status.cz
- 🇸🇪 Sweden: coming soon
- 🇵🇭 Philippines: coming soon
- 🇧🇪 Belgium: coming soon
- 🇮🇸 Iceland: coming soon
- 🇨🇭 Switzerland: coming soon
- 🇩🇪 Germany: coming soon
- ... want one for your country? Join our community: https://t.me/onzecorona

## Why?

The government is working on this, but they're too slow in getting something out fast.

## Mentions in the media

| Title                                                                       | Country | URL                                                                                                                                                        |
| --------------------------------------------------------------------------- | :-----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Self-report system for monitoring COVID19 needs to be in place immediately! |   🇳🇴    | [Read here](https://www.aftenposten.no/meninger/debatt/i/P9ALzX/selvrapporteringssystem-for-overvaaking-av-korona-maa-paa-plass-naa-petter-bae-brandtzaeg) |
| Are you ill? Health services will soon let you self-report symtoms.         |   🇳🇴    | [Read here](https://www.bt.no/innenriks/i/QoAdAx/har-du-vaert-syk-snart-kan-du-hjelpe-helsemyndighetene-med-aa-registrer)                                  |

## Who's behind this?

A bunch of developers from around the world that wanted to help out. This is not an official website from the health services.

## How can I contribute?

Join our Telegram group chat here: https://t.me/onzecorona or reach out on kontakt@bustbyte.no

Click on "Issues" in the menu above to see what we need help with.

## How to launch the site in your country

Adding a new language should be pretty straightforward. If you need help, you can always ask in the Telegram group chat or contact us by email. The following is needed in order to set up a new language:

- Set up a new config file: `cp config.example.json config.json`. `LOCALE` should be one of the locales from [here](https://github.com/ladjs/i18n-locales). `CONTRY_CODE` should be the Alpha-2-code listed here: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
- In `app/locales` you have to add
  - Translations for all the sentences in `en.json`. The keys are the same in all the `{LOCALE}.json`-files, and the values are the translations. We recommend translating everything in the file first, and then testing the site in order to verify that the translations look ok in context.
- In `app/countrySpecific` you have to add (follow filename convention of the files that are already there):
  - A word list that is used for generating unique profile links. If the word list contains between 1000 and 10000 words, you should set `PASSCODE_LENGTH: 4` in the config. If it contains more than 10000 words, `PASSCODE_LENGTH: 3` should be sufficient.
  - List of municipalities (we can help with this [Check Here](app/countrySpecific/README.md)).
  - List of postal code coordinates (we have a script for this [Check Here](app/countrySpecific/README.md)).
- Configure URL paths in `app/domain/urls.ts` (set up for the `COUNTRY_CODE` you added)
- Write a privacy statement in `app/views/privacy-statement/{COUNTRY_CODE}-privacy-statement.ejs`.
- Add a mapping from the locale you added to a corresponding flag in `app/domain/flags.ts`. The code (two letters) of the flag can be found [here](https://flagicons.lipis.dev/).
- You also need a domain (preferably `coronastatus.tld` if it is available), and a server to run the app on. We can assist you with setting this up.
- Generate images for social media etc. using [this guide](https://github.com/BustByte/coronastatus#generating-social-images)
- We can host the site for you if you want that. Just send a message to us in telegram. This makes it easier to maintain and deploy new changes to all the sites. We will give you access to the server as well. If you insist on hosting it yourself, please add your name to the README [here](ops)
- You should also check in the config file for your country in `config-examples/{CONTRY_CODE}-config.json`.

## Start developing

You can either install and run everything on your own machine or build a docker image and run the the local development environment using docker. Choose one of the ways below that fits best to you:

### Developing on your own machine

#### Prerequisities

Download & install:

- [git](https://git-scm.com/downloads)
- [nodejs](https://nodejs.org),
- [yarn](https://yarnpkg.com/)

#### Steps

1. Clone the repository

`git clone https://github.com/BustByte/coronastatus`

2. Move into the newly cloned directory

`cd coronastatus`

3. Install dependencies with our package manager

`yarn`

4. Create a configuration file from the example provided in this repo. Check if an example config exist for your country in [config-examples/](config-examples), otherwise you can use `config.example.json`:

`cp config.example.json config.json` or `cp config-examples/no-config.json config.json`

5. Start the development webserver

`yarn dev`

6. Open your browser and navigate to http://localhost:7272/

7. Before you create a pull request run the linter. Warnings are ok, but errors should be fixed.

`yarn lint`

### Developing using docker

#### Prerequisities

Download & install:

- [git](https://git-scm.com/downloads)
- [Docker CE](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

#### Steps

1. Clone the repository

`git clone https://github.com/BustByte/coronastatus`

2. Move into the newly cloned directory

`cd coronastatus`

3. Create a configuration file from the example provided in this repo

`cp config.example.json config.json`

4. Build docker image and start the development environment:

`docker-compose up --build -d`

5. Open your browser and navigate to http://localhost:7272/

6. Before you create a pull request run the linter. Warnings are ok, but errors should be fixed.

`docker-compose exec app yarn lint`

### Generating social images

Social images (social media share image, Twitter header and generic banner) can be generated by running `yarn build:images` while your dev server is running. They will be placed in the static folder, in the language you defined in your config.json (make sure `LOCALE`, `BASE_URL` and `COUNTRY_CODE` is set correctly). The social-image.png is then automatically linked as social media share image.

### Generation localized word-list

U can use command `yarn make:wordlist`, default word haystack is in Czech Language. For more specific configuration visit scripts/word-list.php.

## Contributors ✨

We're working on updating this section to include everyone who has devoted time and attention to this project. Stay put!
