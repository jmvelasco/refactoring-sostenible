import Renderer from "./renderer.class";

class HTMLRenderer extends Renderer {
  renderStatementHeader(customer: string): string {
    return `<h1>Statement for ${customer}</h1>`;
  }
  renderStatementLineOrder({
    name,
    amount,
    audience,
  }: {
    name: string;
    amount: number;
    audience: number;
  }): string {
    return `<p>&nbsp;${name}: ${this.formatAmount(amount)} (${audience} seats)</p>`;
  }
  renderFooter(totalAmount: number, volumeCredits: number): string {
    return `<p>Amount owed is ${this.formatAmount(totalAmount)}</p><p>You earned ${volumeCredits} credits</p>`;
  }
}

export default HTMLRenderer;