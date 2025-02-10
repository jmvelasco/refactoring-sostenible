import { StatementRenderer, OrderDetails } from "./StatementPrinter";

class TextRenderer implements StatementRenderer {
  header(customer: string): string {
    return `Statement for ${customer}\n`;
  }

  orderLines(lines: OrderDetails[]): string {
    let output = "";
    lines.forEach(({ name, amount, audience }) => {
      output += ` ${name}: ${amount} (${audience} seats)\n`;
    });

    return output;
  }

  footer(totalAmount: string, volumeCredits: number): string {
    let footer = `Amount owed is ${totalAmount}\n`;
    footer += `You earned ${volumeCredits} credits\n`;

    return footer;
  }
}

export default TextRenderer;
