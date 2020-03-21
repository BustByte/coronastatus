# Coronastatus.no
> Report your health status to get a better overview of COVID-19 (currently for Norway only, soon available in the Netherlands)

## What is this?
We don't know how many people have COVID-19. So we made a website where people can self-report symptoms. We plot the submissions on a map and show graphs with trends.

## Why?
The government is working on this, but they're too slow in getting something out fast.

Norwegian article that inspired us to build this:
https://www.aftenposten.no/meninger/debatt/i/P9ALzX/selvrapporteringssystem-for-overvaaking-av-korona-maa-paa-plass-naa-petter-bae-brandtzaeg

## Who's behind this?
A bunch of developers from Norway that wanted to help out. This is not an official website from the health services.

## Mentions in the media
- https://www.tu.no/artikler/utviklere-om-korona-register-vi-kastet-oss-rundt-og-laget-dette/487568

## Hvordan kan jeg bidra?

### Slack
Vi har en felles Slack-kanal du kan bli medlem av. Her prøver vi å koordinere utviklingen så godt vi kan via. en VoIP-samtale.

Send e-postadressen din til kontakt@bustbyte.no, så legger vi deg til snarest. 

### GitHub Issues
Klikk på "Issues" i menyen over for å se hva du kan bidra med.

## Oppsett for utvikling / installasjon

Last ned og installer [nodejs](https://nodejs.org),
[git](https://git-scm.com/downloads) og [yarn](https://yarnpkg.com/)

1. Clone repository git

  `git clone https://github.com/BustByte/coronastatus.no/`

2. CD into folder

  `cd coronastatus.no`

3. Run yarn install

  `yarn`

4. Copy config.example.json to config.json

  `cp config.example.json config.json`

5. Start dev-server

  `yarn start`

6. Open web-browser at http://localhost:7272/

7. Before you create a pull request run the linter. Warnings are ok, but errors should be fixed.

  `yarn lint`
