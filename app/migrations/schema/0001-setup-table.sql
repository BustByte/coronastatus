create table if not exists covid_report (
  phone_number varchar primary key,
  is_verified boolean default false not null,
  json_dump varchar not null
);