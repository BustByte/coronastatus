import { PostalCode, Municipality, Coordinate } from '../domain/types';
import { LANGUAGE } from '../../config.json';
const rawMunicipalities = require(`../locales/${LANGUAGE}-municipalities.json`);
const postalCodesWithCoordinates = require(`../locales/${LANGUAGE}-postalCodeCoordinates.json`);

interface MunicipalityFromFile {
  population: string;
  postalCodes: PostalCode[];
}

interface PostalCodeWithCoordinates {
  postalCode: PostalCode;
  coordinate: Coordinate;
}

interface Municipalities {
  [key: string]: MunicipalityFromFile;
}

export class MunicipalityRepository {
  private lookupMap: Map<PostalCode, Municipality>;

  constructor() {
    this.lookupMap = new Map<PostalCode, Municipality>();
    this.populateLookupMap();
  }

  private populateLookupMap(): void {
    console.log('Populating municipality cache...');
    const municipalities = rawMunicipalities as Municipalities;

    Object.keys(municipalities).forEach((key: string) => {
      const municipality = municipalities[key];
      municipality.postalCodes.forEach((code: PostalCode) => {
        this.lookupMap.set(code, { name: key, ...municipality });
      });
    });
  }

  public getMunicipalityForPostalCode(
    postalCode: PostalCode
  ): Municipality | undefined {
    return this.lookupMap.get(postalCode);
  }

  public getCoordinateForPostalCode(postalCode: PostalCode): Coordinate {
    return postalCodesWithCoordinates[postalCode];
  }
}
