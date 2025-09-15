export function roundToTwo(n: number) {
    return Math.round(n * 100) / 100;
  }
  
  export function calculateTax(itemTotal: number, taxRate = 0.08) {
    // site uses a tax that might be different; default to 8% (we will read tax label in page)
    return roundToTwo(itemTotal * taxRate);
  }
  