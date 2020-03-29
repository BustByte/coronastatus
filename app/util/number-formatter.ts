type FormatNumberFunction = (number: number | string) => string;

export const createNumberFormatter = (
  thousandSeparator: string
): FormatNumberFunction => (number: number | string): string =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
