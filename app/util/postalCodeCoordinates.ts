import fs from 'fs';

const POSTNUMMERE = JSON.parse(
  fs.readFileSync(`${__dirname}/postnummere.json`, 'utf8')
);

export default function(postalCode: string): number[] {
  const postalCodeInfo = POSTNUMMERE.find(
    (e: any) => e.postnummer === postalCode
  );

  if (postalCodeInfo != null) {
    const [x, y] = postalCodeInfo.koordinater.split(', ');
    return [Number(y), Number(x)];
  }
  return [];
}
