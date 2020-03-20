import fs from 'fs';

const POSTNUMMERE = JSON.parse(
  fs.readFileSync(`${__dirname}/postnummere.json`, 'utf8')
);

export default function(postalCode: string): string {
  const postalCodeInfo = POSTNUMMERE.find(
    (e: any) => e.postnummer === postalCode
  );

  if (postalCodeInfo != null) {
    return postalCodeInfo.kommune;
  }
  return '';
}
