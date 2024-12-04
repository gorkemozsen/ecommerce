export function formatToTwoDecimal(num) {
  if (isNaN(num)) {
    throw new Error("Invalid number");
  }

  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}
