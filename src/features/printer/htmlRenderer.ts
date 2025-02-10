import { OrderDetails, StatementRenderer } from "./StatementPrinter";

class HTMLRenderer implements StatementRenderer {
  header(customer: string): string {
    return `<h1>Statement for ${customer}</h1>`;
  }

  orderLines(lines: OrderDetails[]): string {
    let output = "<ul>";
    lines.forEach(({ name, amount, audience }) => {
      output += `<li>${name}: ${amount} (${audience} seats)</li>`;
    });
    output += "</ul>";

    return output;
  }

  footer(totalAmount: string, volumeCredits: number): string {
    return `<p>Amount owed is ${totalAmount}</p><p>You earned ${volumeCredits} credits</p>`;
  }
}

export default HTMLRenderer;
