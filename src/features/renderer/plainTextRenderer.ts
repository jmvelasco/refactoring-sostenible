import { formatAmount } from "../../utils/amount";
import Renderer from "./renderer";


class TextRenderer implements Renderer {
  renderStatementLineOrder({
    name,
    amount,
    audience,
  }: {
    name: string;
    amount: number;
    audience: number;
  }): string {
    return ` ${name}: ${formatAmount(amount)} (${audience} seats)\n`;
  }

  renderFooter(totalAmount: number, volumeCredits: number): string {
    let footer = `Amount owed is ${formatAmount(totalAmount)}\n`;
    footer += `You earned ${volumeCredits} credits\n`;

    return footer;
  }

  renderStatementHeader(customer: string): string {
    return `Statement for ${customer}\n`;
  }
}

export default TextRenderer;

