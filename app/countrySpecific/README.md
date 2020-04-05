## How to create list of municipalities and postcal code coordinates

- Download post codes for your country [from here](https://download.geonames.org/export/zip/)
- Extract it and move `xx.txt` file to this (`countrySpecific`) folder
- Change the first variable in the `geonames-converter.py` script file with your country code (`xx`) in lower case
- Run the script with: `python3 geonames-converter.py`
- Commit two generated files. (`xx/municipalities.json` and `xx/postalCodeCoordinates.json`)
