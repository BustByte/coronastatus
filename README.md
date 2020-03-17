# Coronastatus.no
> Rapporter din helsetilstand slik at vi sammen får bedre oversikt over smittespredningen

## Hva er dette?
Mørketallene på smittede er store. Vi lager en nettside som lar folk rapportere sin helsetilstand.

## Hvorfor?
For å få oversikt over spredning av coronaviruset. Myndighetene vært treige med å få på plass et selvrapporteringssystem.

Vi anbefaler denne artikkelen av Petter Bae Brandtzæg: https://www.aftenposten.no/meninger/debatt/i/P9ALzX/selvrapporteringssystem-for-overvaaking-av-korona-maa-paa-plass-naa-petter-bae-brandtzaeg

## Hvem står bak?
Alle som vil kan bidra. Nettsiden er laget i dugnadsånd av BustByte, et lite konsulentselskap. Dette er ikke en offisiell nettside fra norske myndigheter.

## Medieomtale
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
