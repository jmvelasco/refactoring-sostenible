abstract class Renderer {
  formatAmount(amount: number) {
    const format = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format;
    return format(amount / 100);
  }

  abstract renderStatementHeader(customer: string): string;

  abstract renderStatementLineOrder({
    name,
    amount,
    audience,
  }: {
    name: string;
    amount: number;
    audience: number;
  }): string;

  abstract renderFooter(totalAmount: number, volumeCredits: number): string;
}

export default Renderer;