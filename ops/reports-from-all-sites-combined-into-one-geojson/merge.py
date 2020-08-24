from os import path, listdir
from json import dumps as encode_json, loads as decode_json

all_geojson = {'type': 'FeatureCollection', 'features': []}
for geojson_file in listdir('geojson/'):
    with open('geojson/' + geojson_file, 'r') as f:
        json = decode_json(f.read())
        all_geojson['features'] = all_geojson['features'] + json['features']

print(encode_json(all_geojson))
