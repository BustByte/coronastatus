import { PostalCode, Municipality, Coordinate } from '../domain/types';

const rawMunicipalities = require('../../municipalities.json');
const rawPostalCodesWithCoordinates = require('../../postnummere.json');

interface MunicipalityFromFile {
  population: string;
  postalcodes: PostalCode[];
}

interface PostalCodeWithCoordinates {
  postnummer: PostalCode;
  koordinater: string;
}

interface Municipalities {
  [key: string]: MunicipalityFromFile;
}

export class MunicipalityRepository {
  private lookupMap: Map<PostalCode, Municipality>;

  constructor() {
    this.lookupMap = new Map<PostalCode, Municipality>();
    this.populateMunicipalitiesWithCoordinates();
  }

  private populateMunicipalitiesWithCoordinates(): void {
    console.log('Populating municipality cache...');
    const municipalities = rawMunicipalities as Municipalities;
    const coordinates = rawPostalCodesWithCoordinates as PostalCodeWithCoordinates[];

    Object.keys(municipalities).forEach((key: string) => {
      const municipality = municipalities[key];
      municipality.postalcodes.forEach((code: PostalCode) => {
        const coordinatesForPostCode = coordinates.find(
          coordinate => code === coordinate.postnummer
        ) as PostalCodeWithCoordinates;
        this.lookupMap.set(
          code,
          this.mergeMunicipalityWithCoordinates(
            key,
            municipality,
            coordinatesForPostCode
          )
        );
      });
    });
  }

  private mergeMunicipalityWithCoordinates(
    name: string,
    municipality: MunicipalityFromFile,
    coordinates: PostalCodeWithCoordinates
  ): Municipality {
    return {
      name,
      ...municipality,
      coordinates: this.parseCoordinates(coordinates.koordinater)
    };
  }

  private parseCoordinates(coordinateString: string): Coordinate {
    const components = coordinateString
      .split(',')
      .map(coordinate => coordinate.trim());
    return {
      lat: components[0],
      lon: components[1]
    };
  }

  public getMunicipalityForPostalCode(
    postalCode: PostalCode
  ): Municipality | undefined {
    return this.lookupMap.get(postalCode);
  }
}
