export function formatPrice(price: number) {
  const priceStr = price.toString();

  const parts = priceStr.split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return parts.join('.');
}
