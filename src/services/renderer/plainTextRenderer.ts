import { OrderDetails, StatementRenderer } from "./interface";

class TextRenderer implements StatementRenderer {
  lineOrder({
    name,
    amount,
    audience,
  }: OrderDetails): string {
    return ` ${name}: ${amount} (${audience} seats)\n`;
  }

  footer(totalAmount: string, volumeCredits: number): string {
    let footer = `Amount owed is ${totalAmount}\n`;
    footer += `You earned ${volumeCredits} credits\n`;

    return footer;
  }

  header(customer: string): string {
    return `Statement for ${customer}\n`;
  }
}

export default TextRenderer;

