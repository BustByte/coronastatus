import { PostalCode, Municipality, Coordinate } from '../domain/types';

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
  }

  private async populateLookupMap(): Promise<void> {
    const municipalities = (await (await import('../../municipalities.json'))
      .default) as Municipalities;

    const postalCodesWithCoordinates = (await (
      await import('../../postnummere.json')
    ).default) as PostalCodeWithCoordinates[];

    this.populateMunicipalitiesWithCoordinates(
      municipalities,
      postalCodesWithCoordinates
    );
  }

  private populateMunicipalitiesWithCoordinates(
    municipalities: Municipalities,
    coordinates: PostalCodeWithCoordinates[]
  ): void {
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

  public async getMunicipalityForPostalCode(
    postalCode: PostalCode
  ): Promise<Municipality | undefined> {
    if (this.lookupMap.size === 0) {
      await this.populateLookupMap();
    }
    return this.lookupMap.get(postalCode);
  }
}
