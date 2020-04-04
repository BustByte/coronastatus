from csv import DictReader
from json import dump as write_as_json

# Set the country code you want to create JSON files for
COUNTRY_CODE = 'no'

# Parse CSV for a given country from Geonames.org
rows = []
with open('%s.txt' % COUNTRY_CODE.upper(), 'r') as f:
    fieldnames = [
        'country code',
        'postal code',
        'place name',
        'admin name1',
        'admin code1',
        'admin name2',
        'admin code2',
        'admin name3',
        'admin code3',
        'latitude',
        'longitude',
        'accuracy',
    ]
    csv = DictReader(f, fieldnames=fieldnames, delimiter='\t')
    for row in csv:
        rows.append(row)

# Create a [country-code]/municipalities.json that maps municipalities to zip codes
municipalities = {}
for row in rows:
    municipality = row.get('admin name2').upper()
    if not municipality in municipalities:
        municipalities[municipality] = {'postalCodes': []}
    municipalities[municipality]['postalCodes'].append(row.get('postal code'))

with open('%s/municipalities.json' % COUNTRY_CODE, 'w') as f:
    write_as_json(municipalities, f, indent=2, separators=(',', ': '))

# Create a [country-code]/postalCodesCoordinates.json that maps post code to lat/lng
postal_code_coordinates = {}
for row in rows:
    postal_code = row.get('postal code')
    latitude = row.get('latitude')
    longitude = row.get('longitude')
    if not postal_code in postal_code_coordinates:
         postal_code_coordinates[postal_code] = {'lat': latitude, 'lon': longitude}

with open('%s/postalCodeCoordinates.json' % COUNTRY_CODE, 'w') as f:
    write_as_json(postal_code_coordinates, f, indent=2, separators=(',', ': '))
