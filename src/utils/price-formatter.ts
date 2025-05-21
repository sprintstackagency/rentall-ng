
/**
 * Formats a price in Naira with appropriate abbreviations
 * @param price The price to format
 * @param showCurrency Whether to show the ₦ symbol
 * @returns Formatted price string
 */
export const formatNairaPrice = (price: number | string, showCurrency = true): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) return showCurrency ? '₦0' : '0';
  
  let formattedPrice: string;
  const currency = showCurrency ? '₦' : '';
  
  if (numPrice >= 1000000) {
    formattedPrice = `${currency}${(numPrice / 1000000).toFixed(1)}m`;
  } else if (numPrice >= 1000) {
    formattedPrice = `${currency}${(numPrice / 1000).toFixed(1)}k`;
  } else {
    formattedPrice = `${currency}${numPrice.toFixed(0)}`;
  }
  
  // Remove .0 if it exists
  return formattedPrice.replace('.0', '');
};

/**
 * Formats a price in Naira with full formatting
 * @param price The price to format
 * @returns Formatted price string
 */
export const formatNairaFull = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) return '₦0';
  
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
};
