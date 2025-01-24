
function formatAmount(amount: number) {
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;
  return format(amount / 100);
}

function renderStatementHeader(customer: string) {
  return `Statement for ${customer}\n`;
}

function renderStatementLineOrder({
  name,
  amount,
  audience,
}: {
  name: string;
  amount: number;
  audience: number;
}) {
  return ` ${name}: ${formatAmount(amount)} (${audience} seats)\n`;
}

function renderFooter(totalAmount: number, volumeCredits: number) {
  let footer = `Amount owed is ${formatAmount(totalAmount)}\n`;
  footer += `You earned ${volumeCredits} credits\n`;

  return footer;
}

export {
  renderFooter, renderStatementHeader,
  renderStatementLineOrder
};
