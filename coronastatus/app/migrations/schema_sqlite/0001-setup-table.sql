create table if not exists covid_report (
  passcode varchar,
  json_dump varchar not null
);

PRAGMA journal_mode=WAL;