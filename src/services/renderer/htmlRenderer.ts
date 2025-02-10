import { StatementRenderer, OrderDetails } from "./interface";

class HTMLRenderer implements StatementRenderer {
  header(customer: string): string {
    return `<h1>Statement for ${customer}</h1>`;
  }

  lineOrder({ name, amount, audience }: OrderDetails): string {
    return `<p>${name}: ${amount} (${audience} seats)</p>`;
  }

  footer(totalAmount: string, volumeCredits: number): string {
    return `<p>Amount owed is ${totalAmount}</p><p>You earned ${volumeCredits} credits</p>`;
  }
}

export default HTMLRenderer;