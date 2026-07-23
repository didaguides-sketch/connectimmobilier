/** Extrait la valeur numérique d'un prix affiché ("48 500 000 DA" -> 48500000). */
export function parsePriceValue(price: string): number {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

export function formatNumberFr(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}
