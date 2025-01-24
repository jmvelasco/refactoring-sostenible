import Renderer from "./renderer.class";


class TextRenderer extends Renderer {
  renderStatementLineOrder({
    name,
    amount,
    audience,
  }: {
    name: string;
    amount: number;
    audience: number;
  }): string {
    return ` ${name}: ${this.formatAmount(amount)} (${audience} seats)\n`;
  }

  renderFooter(totalAmount: number, volumeCredits: number): string {
    let footer = `Amount owed is ${this.formatAmount(totalAmount)}\n`;
    footer += `You earned ${volumeCredits} credits\n`;

    return footer;
  }

  renderStatementHeader(customer: string): string {
    return `Statement for ${customer}\n`;
  }
}

export default TextRenderer;

