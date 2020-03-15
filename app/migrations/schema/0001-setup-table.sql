create table if not exists covid_report (
  passcode varchar primary key,
  json_dump varchar not null
);

