interface Renderer {
  renderStatementHeader(customer: string): string;
  renderStatementLineOrder({
    name,
    amount,
    audience,
  }: {
    name: string;
    amount: number;
    audience: number;
  }): string;
  renderFooter(totalAmount: number, volumeCredits: number): string;
}

export default Renderer;